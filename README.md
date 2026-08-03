# Primadent

Проект разделен на две части без фронтенд-фреймворков:

- `static-site/` — готовый статичный сайт для Beget: HTML, CSS, JS и ассеты.
- `server.js` — Node.js API для Render, принимает заявки и отправляет уведомления в Telegram.

## Beget

Загрузите содержимое папки `static-site/` в корень сайта на Beget.

Форма отправляет заявки на:

```txt
https://primadent-api.onrender.com/api/contact
```

Если URL сервиса Render изменится, обновите `CONTACT_API` в `static-site/assets/js/main.js`.

## Render

В Render используйте корень репозитория:

```bash
npm install
npm start
```

Переменные окружения:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
ALLOWED_ORIGINS=https://primadentdonetsk.ru,https://www.primadentdonetsk.ru
```

## API

- `GET /health` — проверка сервиса.
- `POST /api/contact` — отправка заявки.

В API есть серверная валидация, honeypot, минимальное время заполнения формы и rate limit: 5 заявок за 10 минут с одного IP.
