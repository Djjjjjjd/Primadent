import type { H3Event } from 'h3'

type ContactBody = {
  name?: unknown
  phone?: unknown
  message?: unknown
  website?: unknown
  company_url?: unknown
  formStartedAt?: unknown
}

type ContactPayload = {
  name: string
  phone: string
  message: string
}

type RateLimitRecord = {
  count: number
  resetAt: number
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const MIN_FORM_TIME_MS = 3000
const rateLimitStore = new Map<string, RateLimitRecord>()

const normalizeSpaces = (value: string) => value.replace(/\s+/g, ' ').trim()

const hasInjection = (value: string) => {
  return /[<>]|javascript:|data:text\/html|on[a-z]+\s*=/i.test(value)
}

const getBodyString = (value: unknown) => (typeof value === 'string' ? value : '')

const getClientIp = (event: H3Event) => {
  const forwardedFor = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
  return forwardedFor || getRequestIP(event, { xForwardedFor: true }) || 'unknown'
}

const checkRateLimit = (ip: string) => {
  const now = Date.now()
  const current = rateLimitStore.get(ip)

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

const validateContactBody = (body: ContactBody): ContactPayload => {
  const honeypot = normalizeSpaces([
    getBodyString(body.website),
    getBodyString(body.company_url),
  ].join(' '))

  if (honeypot) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      message: 'Invalid request.',
    })
  }

  const formStartedAt = Number(body.formStartedAt)

  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FORM_TIME_MS) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      message: 'The form was submitted too quickly.',
    })
  }

  const name = normalizeSpaces(getBodyString(body.name))
  const phone = normalizeSpaces(getBodyString(body.phone))
  const message = normalizeSpaces(getBodyString(body.message))

  if (name.length < 2 || name.length > 80) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      message: 'Name must be 2-80 characters long.',
    })
  }

  if (!phone || !/^[+\d\s()-]+$/.test(phone)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      message: 'Enter a valid phone number.',
    })
  }

  if (message.length > 1000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      message: 'Message must be 1000 characters or less.',
    })
  }

  if ([name, phone, message].some(hasInjection)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      message: 'HTML and scripts are not allowed.',
    })
  }

  return {
    name,
    phone,
    message,
  }
}

const formatTelegramMessage = ({ name, phone, message }: ContactPayload) => {
  return [
    'New lead from Primadent website',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    message ? `Message: ${message}` : '',
    `Time: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ].filter(Boolean).join('\n')
}

const sendTelegramMessage = async (botToken: string, chatId: string, text: string) => {
  const response = await $fetch<{ ok?: boolean; description?: string }>(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: 'POST',
      body: {
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      },
      timeout: 20000,
    },
  )

  if (!response?.ok) {
    throw new Error(response?.description || 'Telegram API returned an unsuccessful response')
  }
}

export const handleContactRequest = async (event: H3Event) => {
  const ip = getClientIp(event)

  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests',
      message: 'Too many requests. Please try again later.',
    })
  }

  const config = useRuntimeConfig(event)
  const telegramBotToken = String(config.telegramBotToken || '').trim()
  const telegramChatId = String(config.telegramChatId || '').trim()

  if (!telegramBotToken || !telegramChatId) {
    console.error('Telegram env is not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.')

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
      message: 'Lead delivery is temporarily unavailable.',
    })
  }

  const body = await readBody<ContactBody>(event)
  const contact = validateContactBody(body || {})

  try {
    await sendTelegramMessage(telegramBotToken, telegramChatId, formatTelegramMessage(contact))
  } catch {
    console.error('Telegram sendMessage failed.')

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
      message: 'Could not send the lead.',
    })
  }

  return {
    ok: true,
    message: 'Lead sent',
  }
}
