<template>
  <div class="page">
    <section class="hero">
      <div class="hero__slider" aria-hidden="true">
        <img
          v-for="(slide, index) in heroSlides"
          :key="slide.id"
          :src="slide.src"
          :alt="slide.alt"
          class="hero__slide"
          :class="{ 'hero__slide--active': index === activeHeroSlide }"
          :loading="index === 0 ? 'eager' : 'lazy'"
          decoding="async"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
        />
      </div>
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
            <div class="form-field">
              <input
                v-model.trim="heroForm.name"
                type="text"
                class="input"
                :class="{ 'input--error': heroForm.errors.name }"
                placeholder="Ваше имя"
                autocomplete="name"
              />
              <p v-if="heroForm.errors.name" class="field-error">{{ heroForm.errors.name }}</p>
            </div>
            <div class="form-field">
              <input
                v-model.trim="heroForm.phone"
                type="tel"
                class="input"
                :class="{ 'input--error': heroForm.errors.phone }"
                placeholder="Телефон / номер Telegram"
                autocomplete="tel"
                inputmode="tel"
              />
              <p v-if="heroForm.errors.phone" class="field-error">{{ heroForm.errors.phone }}</p>
            </div>
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

    <!-- <DoctorsSlider :ids="[1, 2, 3, 4, 5]" /> -->

    <GallerySlider />

    <section class="seo-content" aria-labelledby="seo-title">
      <div class="wrapper seo-content__inner">
        <div>
          <h2 id="seo-title" class="section-title seo-content__title">
            Стоматология Примадент в Донецке
          </h2>
          <p>
            Примадент — стоматологическая клиника в Донецке по адресу ул. Челюскинцев, 167.
            Мы проводим консультации, диагностику, терапевтическое лечение зубов, хирургическую
            стоматологию, ортопедию, ортодонтию и пародонтологическое лечение.
          </p>
          <p>
            Пациенты обращаются к нам за лечением кариеса, восстановлением зубов, протезированием,
            исправлением прикуса, удалением зубов и комплексным планом лечения. Оставьте заявку на
            сайте, и администратор свяжется с вами для записи на удобное время.
          </p>
        </div>

        <ul class="seo-content__list" aria-label="Услуги стоматологии Примадент">
          <li>Лечение зубов и кариеса</li>
          <li>Хирургическая стоматология</li>
          <li>Ортопедическая стоматология и протезирование</li>
          <li>Ортодонтия и исправление прикуса</li>
          <li>Пародонтология и профилактика</li>
        </ul>
      </div>
    </section>

    <section class="consultation" id="contacts">
      <div class="wrapper consultation__inner">
        <div class="consultation__content">
          <h2 class="section-title consultation__title">Запишитесь на консультацию</h2>
          <p class="consultation__text">
            Оставьте заявку, и мы перезвоним, чтобы подобрать удобное время и ответить на ваши вопросы.
          </p>

          <form class="consultation__form" @submit.prevent="submitLead(consultationForm)">
            <div class="form-field">
              <input
                v-model.trim="consultationForm.name"
                type="text"
                class="input"
                :class="{ 'input--error': consultationForm.errors.name }"
                placeholder="Ваше имя"
                autocomplete="name"
              />
              <p v-if="consultationForm.errors.name" class="field-error">{{ consultationForm.errors.name }}</p>
            </div>
            <div class="form-field">
              <input
                v-model.trim="consultationForm.phone"
                type="tel"
                class="input"
                :class="{ 'input--error': consultationForm.errors.phone }"
                placeholder="Телефон / номер Telegram"
                autocomplete="tel"
                inputmode="tel"
              />
              <p v-if="consultationForm.errors.phone" class="field-error">{{ consultationForm.errors.phone }}</p>
            </div>
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

    <Transition name="toast">
      <div v-if="toast.visible" class="toast" role="status" aria-live="polite">
        <strong>{{ toast.title }}</strong>
        <span>{{ toast.text }}</span>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import CardSurgical from '~/components/CardSurgical.vue'
import CardTherapy from '~/components/CardTherapy.vue'
import CardOrtho from '~/components/CardOrtho.vue'
import CardParadontho from '~/components/CardParadontho.vue'
import CardOrthodont from '~/components/CardOrthodont.vue'
import DoctorsSlider from '~/components/DoctorsSlider.vue'
import GallerySlider from '~/components/GallerySlider.vue'
import { heroImages } from '~/utils/sliderImages'
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
  errors: {
    name: string
    phone: string
  }
}

const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё\s-]{2,60}$/
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15
const HERO_SLIDE_INTERVAL = 2000
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')
const siteName = String(config.public.siteName)
const pageTitle = 'Стоматология Примадент в Донецке | Запись на консультацию'
const pageDescription = 'Стоматологическая клиника Примадент в Донецке: лечение зубов, хирургия, ортопедия, ортодонтия, пародонтология и консультации. Адрес: ул. Челюскинцев, 167.'
const pageKeywords = 'стоматология Донецк, стоматолог Донецк, Примадент, лечение зубов Донецк, протезирование зубов, ортодонт Донецк, хирургическая стоматология'

const heroSlides = heroImages

const activeHeroSlide = ref(0)
let heroSlideTimer: ReturnType<typeof window.setInterval> | undefined

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: pageKeywords,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: siteName,
  ogImage: `${siteUrl}${heroSlides[0]?.src || '/favicon.ico'}`,
  ogLocale: 'ru_RU',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: `${siteUrl}${heroSlides[0]?.src || '/favicon.ico'}`,
  robots: 'index, follow, max-image-preview:large',
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        '@id': `${siteUrl}/#dentist`,
        name: siteName,
        url: siteUrl,
        image: `${siteUrl}${heroSlides[0]?.src || '/favicon.ico'}`,
        logo: `${siteUrl}/favicon.ico`,
        description: pageDescription,
        telephone: '+79493455165',
        email: 'PrimaDentStomat@gmail.ru',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Челюскинцев, 167',
          addressLocality: 'Донецк',
          postalCode: '83015',
          addressCountry: 'RU',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        medicalSpecialty: [
          'Dentistry',
          'Orthodontics',
          'Periodontics',
          'OralSurgery',
        ],
        sameAs: [
          'https://yandex.com/maps/-/CDRAyD82',
        ],
      }),
    },
  ],
})

const heroForm = reactive<LeadForm>({
  name: '',
  phone: '',
  pending: false,
  status: '',
  message: '',
  errors: {
    name: '',
    phone: '',
  },
})

const consultationForm = reactive<LeadForm>({
  name: '',
  phone: '',
  pending: false,
  status: '',
  message: '',
  errors: {
    name: '',
    phone: '',
  },
})

const toast = reactive({
  visible: false,
  title: '',
  text: '',
})

onMounted(() => {
  heroSlideTimer = window.setInterval(() => {
    activeHeroSlide.value = (activeHeroSlide.value + 1) % heroSlides.length
  }, HERO_SLIDE_INTERVAL)
})

onBeforeUnmount(() => {
  if (heroSlideTimer) {
    window.clearInterval(heroSlideTimer)
  }
})

const validateLeadForm = (form: LeadForm) => {
  const normalizedName = form.name.replace(/\s+/g, ' ').trim()
  const normalizedPhone = form.phone.replace(/[^\d+]/g, '')
  const phoneDigits = normalizedPhone.replace(/\D/g, '')

  form.errors.name = ''
  form.errors.phone = ''
  form.status = ''
  form.message = ''

  if (!normalizedName) {
    form.errors.name = 'Введите имя.'
  } else if (!NAME_PATTERN.test(normalizedName)) {
    form.errors.name = 'Имя должно содержать только буквы, пробел или дефис.'
  }

  if (!normalizedPhone) {
    form.errors.phone = 'Введите телефон или номер Telegram.'
  } else if (phoneDigits.length < PHONE_DIGITS_MIN || phoneDigits.length > PHONE_DIGITS_MAX) {
    form.errors.phone = 'Введите корректный телефон или номер Telegram.'
  } else if (normalizedPhone.includes('+') && !normalizedPhone.startsWith('+')) {
    form.errors.phone = 'Плюс можно указать только в начале номера.'
  }

  if (form.errors.name || form.errors.phone) {
    form.status = 'error'
    form.message = 'Проверьте поля формы.'
    return false
  }

  form.name = normalizedName
  form.phone = normalizedPhone
  return true
}

const showSuccessToast = () => {
  toast.title = 'Заявка отправлена'
  toast.text = 'Мы скоро свяжемся с вами.'
  toast.visible = true

  window.setTimeout(() => {
    toast.visible = false
  }, 4200)
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
    showSuccessToast()
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
  overflow: hidden;
  background: #edf1f7;
}

.hero::before,
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero::before {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.82) 34%, rgba(255, 255, 255, 0.18) 66%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(237, 241, 247, 0.2) 100%);
}

.hero::after {
  background: radial-gradient(circle at 78% 42%, rgba(255, 255, 255, 0) 0%, rgba(27, 36, 56, 0.18) 100%);
  mix-blend-mode: multiply;
}

.hero__slider {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center right;
  opacity: 0;
  transform: scale(1.045);
  transition: opacity 1.35s ease, transform 2.4s ease;
  will-change: opacity, transform;
}

.hero__slide--active {
  opacity: 1;
  transform: scale(1);
}

.hero__inner {
  position: relative;
  z-index: 2;
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

.form-field {
  display: grid;
  gap: 6px;
}

.input--error {
  border-color: #c44141;
  box-shadow: 0 0 0 3px rgba(196, 65, 65, 0.12);
}

.field-error {
  font-size: 14px;
  line-height: 1.35;
  color: #c44141;
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

.seo-content {
  padding: 0 0 74px;
}

.seo-content__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 48px;
  align-items: start;
}

.seo-content__title {
  margin-bottom: 18px;
}

.seo-content p + p {
  margin-top: 16px;
}

.seo-content__list {
  display: grid;
  gap: 12px;
  padding: 24px 24px 24px 42px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--surface-color);
  color: var(--text-color);
  font-size: 18px;
  line-height: 1.4;
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

.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 30;
  display: grid;
  gap: 4px;
  width: min(360px, calc(100vw - 32px));
  padding: 16px 18px;
  border: 1px solid rgba(47, 122, 72, 0.2);
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 16px 40px rgba(26, 26, 26, 0.16);
  color: #1a1a1a;
}

.toast strong {
  color: #2f7a48;
  font-size: 18px;
  line-height: 1.2;
}

.toast span {
  font-size: 15px;
  line-height: 1.35;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
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
  }

  .hero::before {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.86) 42%, rgba(255, 255, 255, 0.74) 100%);
  }

  .hero::after {
    background: linear-gradient(180deg, rgba(26, 26, 26, 0.02) 0%, rgba(26, 26, 26, 0.16) 100%);
  }

  .hero__slide {
    object-position: 64% top;
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

  .field-error {
    font-size: 13px;
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

  .seo-content {
    padding: 0 0 44px;
  }

  .seo-content__inner {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .seo-content__list {
    padding: 18px 18px 18px 34px;
    font-size: 15px;
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

  .toast {
    right: 16px;
    bottom: 16px;
  }
}
</style>
