import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

type TelegramLeadBody = {
  name?: string
  phone?: string
}

const execFileAsync = promisify(execFile)

const formatTelegramMessage = (name: string, phone: string) => {
  return [
    'Новая заявка с сайта Primadent',
    '',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ].join('\n')
}

const sendTelegramWithFetch = async (botToken: string, chatId: string, text: string) => {
  await $fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    body: {
      chat_id: chatId,
      text,
    },
    timeout: 20000,
  })
}

const sendTelegramWithPowerShell = async (botToken: string, chatId: string, text: string) => {
  if (process.platform !== 'win32') {
    throw new Error('PowerShell fallback is available only on Windows')
  }

  const payloadBase64 = Buffer
    .from(JSON.stringify({ chat_id: chatId, text }), 'utf8')
    .toString('base64')

  const script = [
    "$ErrorActionPreference = 'Stop'",
    "$payload = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($env:TELEGRAM_PAYLOAD_BASE64))",
    "$uri = \"https://api.telegram.org/bot$($env:TELEGRAM_BOT_TOKEN)/sendMessage\"",
    "Invoke-RestMethod -Uri $uri -Method Post -ContentType 'application/json; charset=utf-8' -Body $payload -TimeoutSec 20 | Out-Null",
  ].join('\n')

  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key], index, entries) => {
      const normalizedKey = key.toLowerCase()
      return entries.findIndex(([entryKey]) => entryKey.toLowerCase() === normalizedKey) === index
    }),
  )

  await execFileAsync(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script],
    {
      env: {
        ...env,
        TELEGRAM_BOT_TOKEN: botToken,
        TELEGRAM_PAYLOAD_BASE64: payloadBase64,
      },
      timeout: 30000,
      windowsHide: true,
    },
  )
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const telegramBotToken = String(config.telegramBotToken || '').trim()
  const telegramChatId = String(config.telegramChatId || '').trim()
  const body = await readBody<TelegramLeadBody>(event)

  const name = body?.name?.replace(/\s+/g, ' ').trim()
  const phone = body?.phone?.trim()

  if (!name || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Заполните имя и телефон',
    })
  }

  if (!telegramBotToken || !telegramChatId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не настроены Telegram-переменные окружения',
    })
  }

  const text = formatTelegramMessage(name, phone)

  try {
    await sendTelegramWithFetch(telegramBotToken, telegramChatId, text)
  } catch (error) {
    console.error('Telegram sendMessage failed', error)

    try {
      await sendTelegramWithPowerShell(telegramBotToken, telegramChatId, text)
    } catch (fallbackError) {
      console.error('Telegram PowerShell fallback failed', fallbackError)

      throw createError({
        statusCode: 502,
        statusMessage: 'Telegram не принял заявку',
        message: 'Проверьте chat_id, права бота и доступ сервера к api.telegram.org',
      })
    }
  }

  return {
    ok: true,
  }
})
