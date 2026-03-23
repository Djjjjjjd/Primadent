export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<{
    name?: string
    phone?: string
  }>(event)

  const name = body?.name?.trim()
  const phone = body?.phone?.trim()

  if (!name || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Заполните имя и телефон',
    })
  }

  if (!config.telegramBotToken || !config.telegramChatId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не настроены Telegram-переменные окружения',
    })
  }

  const text = [
    'Новая заявка с сайта Primadent',
    '',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ].join('\n')

  await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
    method: 'POST',
    body: {
      chat_id: config.telegramChatId,
      text,
    },
  })

  return {
    ok: true,
  }
})
