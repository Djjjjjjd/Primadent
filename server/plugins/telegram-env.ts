export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  const telegramBotToken = String(config.telegramBotToken || '').trim()
  const telegramChatId = String(config.telegramChatId || '').trim()

  if (!telegramBotToken || !telegramChatId) {
    console.error('Telegram env is not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.')
  }
})
