import http from 'node:http'

const PORT = process.env.PORT || 3000
const TELEGRAM_BOT_TOKEN = String(process.env.TELEGRAM_BOT_TOKEN || '').trim()
const TELEGRAM_CHAT_ID = String(process.env.TELEGRAM_CHAT_ID || '').trim()
const ALLOWED_ORIGINS = String(process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const MIN_FORM_TIME_MS = 3000
const MAX_BODY_SIZE = 10 * 1024
const rateLimitStore = new Map()

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

const normalizeSpaces = (value) => value.replace(/\s+/g, ' ').trim()
const hasInjection = (value) => /[<>]|javascript:|data:text\/html|on[a-z]+\s*=/i.test(value)
const getBodyString = (value) => (typeof value === 'string' ? value : '')

const checkRateLimit = (ip) => {
  const now = Date.now()

  for (const [storedIp, record] of rateLimitStore.entries()) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(storedIp)
    }
  }

  const current = rateLimitStore.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false
  }

  current.count += 1
  return true
}

const validateContactBody = (body) => {
  const honeypot = normalizeSpaces([
    getBodyString(body.website),
    getBodyString(body.company_url),
  ].join(' '))

  if (honeypot) {
    throw new HttpError(400, 'Invalid request.')
  }

  const formStartedAt = Number(body.formStartedAt)

  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FORM_TIME_MS) {
    throw new HttpError(400, 'The form was submitted too quickly.')
  }

  const name = normalizeSpaces(getBodyString(body.name))
  const phone = normalizeSpaces(getBodyString(body.phone))
  const message = normalizeSpaces(getBodyString(body.message))

  if (name.length < 2 || name.length > 80) {
    throw new HttpError(400, 'Name must be 2-80 characters long.')
  }

  if (!phone || !/^[+\d\s()-]+$/.test(phone)) {
    throw new HttpError(400, 'Enter a valid phone number.')
  }

  if (message.length > 1000) {
    throw new HttpError(400, 'Message must be 1000 characters or less.')
  }

  if ([name, phone, message].some(hasInjection)) {
    throw new HttpError(400, 'HTML and scripts are not allowed.')
  }

  return { name, phone, message }
}

const formatTelegramMessage = ({ name, phone, message }) => {
  return [
    'New lead from Primadent website',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    message ? `Message: ${message}` : '',
    `Time: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ].filter(Boolean).join('\n')
}

const sendTelegramMessage = async (text) => {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      disable_web_page_preview: true,
    }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || !data.ok) {
    throw new Error(data.description || 'Telegram API returned an unsuccessful response')
  }
}

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for']

  if (typeof forwardedFor === 'string' && forwardedFor.length) {
    return forwardedFor.split(',')[0].trim()
  }

  return req.socket.remoteAddress || 'unknown'
}

const readJsonBody = (req) => new Promise((resolve, reject) => {
  let data = ''
  let size = 0

  req.on('data', (chunk) => {
    size += chunk.length

    if (size > MAX_BODY_SIZE) {
      reject(new HttpError(413, 'Payload too large.'))
      req.destroy()
      return
    }

    data += chunk
  })

  req.on('end', () => {
    if (!data) {
      resolve({})
      return
    }

    try {
      resolve(JSON.parse(data))
    } catch {
      reject(new HttpError(400, 'Invalid JSON.'))
    }
  })

  req.on('error', reject)
})

const applyCors = (req, res) => {
  const origin = req.headers.origin

  if (ALLOWED_ORIGINS.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*')
  } else if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const sendJson = (res, statusCode, payload) => {
  const body = JSON.stringify(payload)
  res.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' })
  res.end(body)
}

const server = http.createServer(async (req, res) => {
  applyCors(req, res)

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'GET' && req.url === '/health') {
    sendJson(res, 200, { ok: true })
    return
  }

  if (req.method !== 'POST' || req.url !== '/api/contact') {
    sendJson(res, 404, { ok: false, message: 'Not found.' })
    return
  }

  try {
    const ip = getClientIp(req)

    if (!checkRateLimit(ip)) {
      throw new HttpError(429, 'Too many requests. Please try again later.')
    }

    const body = await readJsonBody(req)
    const contact = validateContactBody(body || {})

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram env is not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.')
      throw new HttpError(500, 'Lead delivery is temporarily unavailable.')
    }

    try {
      await sendTelegramMessage(formatTelegramMessage(contact))
    } catch (error) {
      console.error('Telegram sendMessage failed.')
      throw new HttpError(500, 'Could not send the lead.')
    }

    sendJson(res, 200, { ok: true, message: 'Lead sent' })
  } catch (error) {
    const statusCode = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof HttpError ? error.message : 'Server error.'
    sendJson(res, statusCode, { ok: false, message })
  }
})

server.listen(PORT, () => {
  console.log(`Contact service listening on port ${PORT}`)
})



