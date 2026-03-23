<template>
  <div class="page" :style="heroStyle">
    <section class="hero">
      <div class="wrapper hero__inner">
        <div class="hero__content">
          <p class="hero__license">
            Лицензия:
            <span class="hero__license-accent">Л041-01709-93/02968061</span>
          </p>

          <h1 class="hero__title">Запишитесь на консультацию</h1>
          <p class="hero__text">
            Мы свяжемся с вами, ответим на вопросы и подберём удобное время для визита в клинику.
          </p>

          <form class="hero__form" @submit.prevent="submitLead(heroForm)">
            <input v-model.trim="heroForm.name" type="text" class="input" placeholder="Ваше имя" />
            <input v-model.trim="heroForm.phone" type="tel" class="input" placeholder="Номер телефона" />
            <button type="submit" class="button hero__submit" :disabled="heroForm.pending">
              {{ heroForm.pending ? 'Отправка...' : 'Отправить' }}
            </button>
            <p v-if="heroForm.message" :class="['form-status', `form-status--${heroForm.status}`]">
              {{ heroForm.message }}
            </p>
          </form>
        </div>
      </div>
    </section>

    <section class="services">
      <div class="wrapper">
        <div class="services__grid">
          <CardSurgical />
          <CardTherapy />
          <CardOrtho />
          <CardParadontho />
          <div class="services__wide">
            <CardOrthodont />
          </div>
        </div>
      </div>
    </section>

    <DoctorsSlider :ids="[1, 2, 3, 4, 5]" />

    <GallerySlider />

    <section class="consultation" id="contacts">
      <div class="wrapper consultation__inner">
        <div class="consultation__content">
          <h2 class="section-title consultation__title">Запишитесь на консультацию</h2>
          <p class="consultation__text">
            Оставьте заявку, и мы перезвоним, чтобы подобрать удобное время и ответить на ваши вопросы.
          </p>

          <form class="consultation__form" @submit.prevent="submitLead(consultationForm)">
            <input v-model.trim="consultationForm.name" type="text" class="input" placeholder="Ваше имя" />
            <input v-model.trim="consultationForm.phone" type="tel" class="input" placeholder="Номер телефона" />
            <div class="consultation__actions">
              <button type="submit" class="button" :disabled="consultationForm.pending">
                {{ consultationForm.pending ? 'Отправка...' : 'Отправить' }}
              </button>
              <span class="consultation__or">или</span>
              <a href="https://t.me/" class="consultation__social">
                <img :src="telegramIcon" alt="Telegram" />
              </a>
              <a href="https://wa.me/79493455165" class="consultation__social">
                <img :src="whatsAppIcon" alt="WhatsApp" />
              </a>
            </div>
            <p
              v-if="consultationForm.message"
              :class="['form-status', `form-status--${consultationForm.status}`]"
            >
              {{ consultationForm.message }}
            </p>
          </form>
        </div>

        <div class="consultation__art">
          <img :src="consultationArt" alt="Иллюстрация записи на консультацию" />
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="wrapper footer__inner">
        <div class="footer__info">
          <div class="footer__brand">
            <img :src="logoBlack" alt="Примадент" />
          </div>
          <h3 class="footer__title">Современная стоматология<br />для вашей улыбки</h3>
          <p class="footer__text">
            Современная стоматология, точная диагностика и забота о каждом пациенте.
          </p>
          <div class="footer__contacts">
            <a href="https://yandex.com/maps/-/CDRAyD82">83015, г. Донецк, ул. Челюскинцев, 167</a>
            <a href="tel:+79493455165">Телефон: +7(949) 345-51-65</a>
            <p>С 9:00 до 18:00, выходной - воскресенье</p>
            <a href="mailto:PrimaDentStomat@gmail.ru">e-mail: PrimaDentStomat@gmail.ru</a>
          </div>
        </div>

        <div class="footer__map">
          <iframe
            title="Карта Примадент"
            src="https://yandex.ru/map-widget/v1/?text=83015%2C%20%D0%B3.%20%D0%94%D0%BE%D0%BD%D0%B5%D1%86%D0%BA%2C%20%D1%83%D0%BB.%20%D0%A7%D0%B5%D0%BB%D1%8E%D1%81%D0%BA%D0%B8%D0%BD%D1%86%D0%B5%D0%B2%2C%20167&z=17"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import CardSurgical from '~/components/CardSurgical.vue'
import CardTherapy from '~/components/CardTherapy.vue'
import CardOrtho from '~/components/CardOrtho.vue'
import CardParadontho from '~/components/CardParadontho.vue'
import CardOrthodont from '~/components/CardOrthodont.vue'
import DoctorsSlider from '~/components/DoctorsSlider.vue'
import GallerySlider from '~/components/GallerySlider.vue'
import heroImage from '~/images/hero.webp'
import consultationArt from '~/images/consultation_art.png'
import logoBlack from '~/images/icon/logo_black.svg'
import telegramIcon from '~/images/icon/icons_telegram.svg'
import whatsAppIcon from '~/images/icon/icons_whatsapp.svg'

type LeadForm = {
  name: string
  phone: string
  pending: boolean
  status: 'success' | 'error' | ''
  message: string
}

const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё\s-]{2,}$/
const PHONE_DIGITS_MIN = 10

const heroStyle = {
  '--hero-image': `url(${heroImage})`,
}

const heroForm = reactive<LeadForm>({
  name: '',
  phone: '',
  pending: false,
  status: '',
  message: '',
})

const consultationForm = reactive<LeadForm>({
  name: '',
  phone: '',
  pending: false,
  status: '',
  message: '',
})

const validateLeadForm = (form: LeadForm) => {
  const normalizedName = form.name.replace(/\s+/g, ' ').trim()
  const normalizedPhone = form.phone.replace(/[^\d+]/g, '')
  const phoneDigits = normalizedPhone.replace(/\D/g, '')

  if (!normalizedName || !normalizedPhone) {
    form.status = 'error'
    form.message = 'Заполните имя и телефон.'
    return false
  }

  if (!NAME_PATTERN.test(normalizedName)) {
    form.status = 'error'
    form.message = 'Введите корректное имя.'
    return false
  }

  if (phoneDigits.length < PHONE_DIGITS_MIN) {
    form.status = 'error'
    form.message = 'Введите корректный номер телефона.'
    return false
  }

  form.name = normalizedName
  form.phone = normalizedPhone
  return true
}

const submitLead = async (form: LeadForm) => {
  if (!validateLeadForm(form)) {
    return
  }

  form.pending = true
  form.status = ''
  form.message = ''

  try {
    await $fetch('/api/telegram', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
      },
    })

    form.name = ''
    form.phone = ''
    form.status = 'success'
    form.message = 'Заявка отправлена. Мы скоро свяжемся с вами.'
  } catch {
    form.status = 'error'
    form.message = 'Не удалось отправить заявку. Попробуйте ещё раз.'
  } finally {
    form.pending = false
  }
}
</script>

<style scoped>
.page {
  overflow: clip;
}

.hero {
  position: relative;
  min-height: 100svh;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.82) 34%, rgba(255, 255, 255, 0.16) 66%),
    var(--hero-image) center right / cover no-repeat;
  background-attachment: fixed;
}

.hero__inner {
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding: 144px 0 96px;
}

.hero__content {
  max-width: 550px;
}

.hero__license {
  margin-bottom: 12px;
  font-size: 16px;
  color: #5a6478;
}

.hero__license-accent {
  color: var(--primary-color);
  font-weight: 700;
}

.hero__title {
  margin-bottom: 16px;
  font-size: 40px;
}

.hero__text {
  max-width: 550px;
  margin-bottom: 34px;
  font-size: 20px;
  color: #1a1a1a;
}

.hero__form,
.consultation__form {
  display: grid;
  gap: 14px;
}

.hero__submit {
  width: fit-content;
  min-width: 168px;
  margin-top: 18px;
}

.form-status {
  font-size: 16px;
  line-height: 1.4;
}

.form-status--success {
  color: #2f7a48;
}

.form-status--error {
  color: #c44141;
}

.services {
  position: relative;
  z-index: 2;
  margin-top: -54px;
  padding-bottom: 48px;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.services__wide {
  grid-column: 1 / -1;
  width: min(100%, 520px);
  justify-self: center;
}

.consultation {
  padding: 28px 0 86px;
}

.consultation__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 52px;
  align-items: center;
}

.consultation__title {
  margin-bottom: 18px;
}

.consultation__text {
  max-width: 550px;
  margin-bottom: 26px;
}

.consultation__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.consultation__actions .button {
  min-width: 180px;
}

.consultation__or {
  color: #535a67;
  font-size: 18px;
}

.consultation__social {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #667799;
  box-shadow: 0 0 10px rgba(83, 98, 127, 0.18);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.consultation__social:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.consultation__social img {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 0 10px rgba(235, 242, 255, 0.3));
}

.consultation__art {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  padding: 50px 0;
  background: #1a1a1a;
  color: #ffffff;
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 48px;
  align-items: center;
}

.footer__brand {
  margin-bottom: 40px;
}

.footer__brand img {
  width: 220px;
  filter: brightness(0) invert(1);
}

.footer__title {
  max-width: 550px;
  margin-bottom: 14px;
  font-size: 32px;
  color: #ffffff;
}

.footer__text,
.footer__contacts p,
.footer__contacts a {
  color: #ffffff;
}

.footer__text {
  max-width: 430px;
  margin-bottom: 40px;
}

.footer__contacts {
  display: grid;
  gap: 10px;
  font-size: 18px;
}

.footer__contacts a:hover {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.footer__map {
  min-height: 500px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
}

.footer__map iframe {
  display: block;
  width: 100%;
  min-height: 500px;
  border: 0;
}

@media (max-width: 1024px) {
  .consultation__inner,
  .footer__inner {
    grid-template-columns: 1fr;
  }

  .consultation__art {
    order: -1;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 100svh;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.84) 42%, rgba(255, 255, 255, 0.72) 100%),
      var(--hero-image) 64% top / cover no-repeat;
    background-attachment: fixed;
  }

  .hero__inner {
    min-height: 100svh;
    align-items: center;
    padding: 96px 0 40px;
  }

  .hero__content {
    max-width: 320px;
    margin-right: auto;
  }

  .hero__license {
    margin-bottom: 14px;
    font-size: 16px;
  }

  .hero__title {
    max-width: 100%;
    margin-bottom: 18px;
    font-size: 36px;
    line-height: 1.06;
  }

  .hero__text {
    max-width: 100%;
    margin-bottom: 26px;
    font-size: 18px;
    line-height: 1.42;
  }

  .hero__submit {
    width: 100%;
    min-width: 0;
    margin-top: 8px;
  }

  .form-status {
    font-size: 14px;
  }

  .services {
    margin-top: -18px;
    padding-bottom: 28px;
  }

  .services__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .services__wide {
    width: 100%;
  }

  .consultation {
    padding: 16px 0 52px;
  }

  .consultation__inner {
    gap: 24px;
  }

  .consultation__text {
    margin-bottom: 18px;
  }

  .consultation__form {
    gap: 10px;
  }

  .consultation__actions {
    margin-top: 2px;
    gap: 10px;
  }

  .consultation__actions .button {
    min-width: 0;
    width: 100%;
  }

  .consultation__or {
    display: none;
  }

  .consultation__social {
    width: 44px;
    height: 44px;
    border-radius: 8px;
  }

  .consultation__social img {
    width: 30px;
    height: 30px;
  }

  .footer__title {
    font-size: 22px;
  }

  .footer__brand {
    margin-bottom: 24px;
  }

  .footer__brand img {
    width: 150px;
  }

  .footer__text {
    margin-bottom: 20px;
  }

  .footer__contacts {
    gap: 8px;
    font-size: 15px;
  }

  .footer__map,
  .footer__map iframe {
    min-height: 280px;
  }
}
</style>
