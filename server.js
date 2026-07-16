import http from 'http'
import url from 'url'

// Конфиг
const PORT = process.env.PORT || 3000
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const MIN_FORM_TIME_MS = 3000

const rateLimitStore = new Map()

// Утилиты
const normalizeSpaces = (value) => value.replace(/\s+/g, ' ').trim()

const hasInjection = (value) => /[<>]|javascript:|data:text\/html|on[a-z]+\s*=/i.test(value)

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
  return forwardedFor || req.socket.remoteAddress || 'unknown'
}

const checkRateLimit = (ip) => {
  const now = Date.now()
  const current = rateLimitStore.get(ip)

  // Очистка старых записей
  for (const [storedIp, record] of rateLimitStore.entries()) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(storedIp)
    }
  }

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return true
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false
  }

  current.count += 1
  return true
}

const validateBody = (body) => {
  // Honeypot проверка
  const honeypot = normalizeSpaces([body.website || '', body.company_url || ''].join(' '))
  if (honeypot) {
    throw new Error('Validation error: Invalid request.')
  }

  // Проверка времени заполнения формы
  const formStartedAt = Number(body.formStartedAt)
  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FORM_TIME_MS) {
    throw new Error('Validation error: The form was submitted too quickly.')
  }

  // Валидация полей
  const name = normalizeSpaces(body.name || '')
  const phone = normalizeSpaces(body.phone || '')
  const message = normalizeSpaces(body.message || '')

  if (!name || name.length < 2 || name.length > 80) {
    throw new Error('Validation error: Name must be 2-80 characters long.')
  }

  if (!phone || !/^[+\d\s()-]+$/.test(phone)) {
    throw new Error('Validation error: Enter a valid phone number.')
  }

  if (message.length > 1000) {
    throw new Error('Validation error: Message must be 1000 characters or less.')
  }

  if ([name, phone, message].some(hasInjection)) {
    throw new Error('Validation error: HTML and scripts are not allowed.')
  }

  return { name, phone, message }
}

const sendTelegramMessage = async (botToken, chatId, text) => {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  })

  const data = await response.json()
  if (!data.ok) {
    throw new Error(data.description || 'Telegram API error')
  }
}

const formatTelegramMessage = ({ name, phone, message }) => {
  return [
    'New lead from Primadent website',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    message ? `Message: ${message}` : '',
    `Time: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ]
    .filter(Boolean)
    .join('\n')
}

const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'))
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

// Создание сервера
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Обработка OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  // Маршрутизация
  const parsedUrl = url.parse(req.url, true)
  const pathname = parsedUrl.pathname

  if (pathname === '/api/contact' && req.method === 'POST') {
    try {
      const ip = getClientIp(req)

      if (!checkRateLimit(ip)) {
        res.writeHead(429, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Too many requests. Please try again later.' }))
        return
      }

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set')
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Lead delivery is temporarily unavailable.' }))
        return
      }

      const body = await parseBody(req)
      const contact = validateBody(body)

      await sendTelegramMessage(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, formatTelegramMessage(contact))

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true, message: 'Lead sent' }))
    } catch (error) {
      console.error('Error processing contact:', error)
      const statusCode = error.message.includes('Validation error') ? 400 : 500
      const message = error.message.includes('Validation error')
        ? error.message.replace('Validation error: ', '')
        : 'Could not send the lead.'

      res.writeHead(statusCode, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: message }))
    }
    return
  }

  // Health check
  if (pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`POST http://localhost:${PORT}/api/contact - отправить заявку`)
  console.log(`GET http://localhost:${PORT}/health - проверить статус`)
})
