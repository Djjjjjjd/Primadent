# Интеграция формы со статичным сайтом

## Архитектура

- **Frontend:** Статичный сайт на Beget (HTML/CSS/JS)
- **Backend API:** Node.js сервер на Render (обработка форм + Telegram)

## Как интегрировать форму

### 1. HTML форма на вашем сайте

```html
<form id="contactForm">
  <input type="hidden" id="formStartedAt" value="">
  
  <input type="text" name="name" placeholder="Ваше имя" required>
  <input type="tel" name="phone" placeholder="+7 (999) 123-45-67" required>
  <textarea name="message" placeholder="Сообщение"></textarea>
  
  <!-- Honeypot (скрытое поле) -->
  <input type="text" name="website" style="display: none;">
  <input type="text" name="company_url" style="display: none;">
  
  <button type="submit">Отправить</button>
</form>
```

### 2. JavaScript для отправки

```javascript
const API_URL = 'https://primadent-api.onrender.com' // Замените на ваш URL Render

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const form = e.target
  const submitBtn = form.querySelector('button[type="submit"]')
  
  // Заполнить время начала заполнения
  document.getElementById('formStartedAt').value = Date.now()
  
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  
  submitBtn.disabled = true
  submitBtn.textContent = 'Отправляю...'
  
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (response.ok) {
      alert('✅ Спасибо! Ваша заявка отправлена.')
      form.reset()
    } else {
      alert(`❌ Ошибка: ${result.error}`)
    }
  } catch (error) {
    alert('❌ Ошибка при отправке. Попробуйте позже.')
    console.error(error)
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = 'Отправить'
  }
})
```

## Развёртывание на Render

### 1. Telegram Bot

1. Напишите [@BotFather](https://t.me/botfather)
2. `/newbot` → выберите имя и юзернейм
3. Скопируйте токен: `123456789:ABCdefGHijKlmnoPQRstUvwxyz`
4. Отправьте боту сообщение (активируйте)
5. Откройте: `https://api.telegram.org/bot<TOKEN>/getUpdates`
6. Скопируйте `chat.id`

### 2. Render

1. Зайдите на [render.com](https://render.com)
2. **New +** → **Web Service**
3. Подключите GitHub репо
4. Заполните:
   - **Name:** `primadent-api`
   - **Runtime:** Node
   - **Build:** `npm install`
   - **Start:** `npm start`
5. В **Environment variables** добавьте:
   ```
   TELEGRAM_BOT_TOKEN = ваш_токен
   TELEGRAM_CHAT_ID = ваш_chat_id
   NODE_ENV = production
   ```
6. Нажмите **Deploy**

### 3. Тестирование локально

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000/health` — должно вернуть `{"status":"ok"}`

Отправьте заявку — сообщение должно прийти в Telegram.

## Использованный URL на вашем сайте

После развёртывания на Render вы получите URL вроде:
```
https://primadent-api.onrender.com
```

**В JavaScript коде замените:**
```javascript
const API_URL = 'https://primadent-api.onrender.com'
```

## API Endpoints

### POST /api/contact
Отправить заявку

**Payload:**
```json
{
  "name": "Иван Петров",
  "phone": "+7 (999) 123-45-67",
  "message": "Нужна консультация",
  "formStartedAt": 1626518400000,
  "website": "",
  "company_url": ""
}
```

**Response (успех):**
```json
{
  "ok": true,
  "message": "Lead sent"
}
```

**Response (ошибка):**
```json
{
  "error": "Enter a valid phone number."
}
```

### GET /health
Проверить статус сервера

**Response:**
```json
{
  "status": "ok"
}
```

## Ограничения

- **Rate limit:** 5 заявок с одного IP за 10 минут
- **Минимальное время заполнения:** 3 секунды (защита от ботов)
- **Длина имени:** 2-80 символов
- **Сообщение:** до 1000 символов
- **Honeypot:** скрытые поля для фильтрации ботов

## Troubleshooting

| Проблема | Решение |
|----------|---------|
| 500 ошибка | Проверьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в Render |
| 429 ошибка | Превышен лимит заявок. Попробуйте через 10 минут |
| Сообщение не пришло | Активировали ли вы бота в Telegram? Правильный ли chat_id? |
| CORS ошибка | API поддерживает CORS для всех источников |

## На Free плане Render

- ⏰ Приложение засыпает после 15 минут без запросов (холодный старт ~30-60 сек)
- 💾 0.5GB RAM
- 🆓 Идеально для стартапа

При росте трафика → Starter план ($7/месяц)
