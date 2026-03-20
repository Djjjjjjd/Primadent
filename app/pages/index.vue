<template>
  <div class="page">
    <section class="hero">
      <div class="wrapper hero__inner">
        <div class="hero__content">
          <p class="hero__license">
            Лицензия -
            <span class="hero__license-accent">Л041-01709-93/02968061</span>
          </p>

          <h1 class="hero__title">Запишитесь на консультацию</h1>
          <p class="hero__text">
            Мы свяжемся с вами, ответим на вопросы и подберём удобное время для
            посещения клиники.
          </p>

          <form class="hero__form">
            <input type="text" class="input" placeholder="ФИО" />
            <input type="text" class="input" placeholder="Номер телефона" />
            <button type="button" class="button hero__submit">Отправить</button>
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
            Мы свяжемся с вами, ответим на вопросы и подберём удобное время для
            посещения клиники.
          </p>

          <form class="consultation__form">
            <input type="text" class="input" placeholder="ФИО" />
            <input type="text" class="input" placeholder="Номер телефона" />
            <div class="consultation__actions">
              <button type="button" class="button">Отправить</button>
              <span class="consultation__or">или</span>
              <a href="https://t.me/" class="consultation__social"><img src="/images/icon/icons_telegram.svg" alt="Telegram"></a>
              <a href="https://wa.me/79493455165" class="consultation__social"><img src="/images/icon/icons_whatsapp.svg" alt="WhatsApp"></a>
            </div>
          </form>
        </div>

        <div class="consultation__art">
          <img src="/images/consultation_art.png" alt="consultation_art">
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="wrapper footer__inner">
        <div class="footer__info">
          <div class="footer__brand">
            <img src="/images/icon/logo_black.svg" alt="Примадент" />
          </div>
          <h3 class="footer__title">Современная стоматология<br>для вашей улыбки</h3>
          <p class="footer__text">
            Современная стоматология, точная диагностика и забота о каждом пациенте.
          </p>
          <div class="footer__contacts">
            <a href="https://yandex.com/maps/-/CDRAyD82">83015, г. Донецк, ул. Челюскинцев, 167</a>
            <a href="tel:+79493455165">Телефон: +7(949) 345-51-65</a>
            <p>с 9:00 до 18:00, выходной - воскресенье</p>
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
import CardSurgical from '~/components/CardSurgical.vue'
import CardTherapy from '~/components/CardTherapy.vue'
import CardOrtho from '~/components/CardOrtho.vue'
import CardParadontho from '~/components/CardParadontho.vue'
import CardOrthodont from '~/components/CardOrthodont.vue'
import DoctorsSlider from '~/components/DoctorsSlider.vue'
import GallerySlider from '~/components/GallerySlider.vue'
</script>

<style scoped>
.page {
  overflow: clip;
}
.hero {
  position: relative;
  min-height: 100vh;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.78) 32%, rgba(255, 255, 255, 0.18) 62%),
    url('/images/hero.webp') center/cover no-repeat;
}
.hero__inner {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 148px 0 88px;
}
.hero__content {
  max-width: 550px;
}
.hero__license {
  margin-bottom: 10px;
  color: #5a6478;
}

.hero__license-accent {
  color: var(--primary-color);
}

.hero__title {
  margin-bottom: 10px;
  font-size: 32px;
}

.hero__text {
  max-width: 550px;
  margin-bottom: 40px;
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
  min-width: 160px;
  min-height: 70px;
  margin-top: 40px;
}

.consultation__actions .button {
  min-height: 70px;
}
.consultation__actions{
  margin-top: 40px;
}

.services {
  margin-top: -60px;
  padding-bottom: 36px;
  position: relative;
  z-index: 2;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.services__wide {
  grid-column: 1 / -1;
  width: min(100%, 500px);
  justify-self: center;
}

.consultation {
  padding: 32px 0 86px;
}

.consultation__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 52px;
  align-items: center;
}

.consultation__title {
  margin-bottom: 30px;
}

.consultation__text {
  max-width: 550px;
  margin-bottom: 40px;
}

.consultation__actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.consultation__or {
  color: #535a67;
  font-size: 20px;
}

.consultation__social {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #667799;
  color: #fff;
  text-transform: uppercase;
  font-size: 20px;
  box-shadow: 0 0 10px rgba(83, 98, 127, 0.18);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.consultation__social:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}
.consultation__social img {
  width: 50px;
  height: 50px;
  filter: drop-shadow(0 0 10px rgba(235, 242, 255, 0.3));
}

.consultation__art {
  position: relative;
  min-height: 340px;
}

.consultation__floating {
  position: absolute;
  border-radius: 24px;
  background: linear-gradient(180deg, #f3fbfd 0%, #eef3ff 100%);
  box-shadow: 0 16px 34px rgba(58, 81, 122, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.consultation__floating img {
  width: 64%;
  height: 64%;
  object-fit: contain;
}

.consultation__floating--big {
  inset: 12px auto auto 38px;
  width: 136px;
  height: 136px;
}

.consultation__floating--mid {
  top: 136px;
  right: 56px;
  width: 124px;
  height: 124px;
}

.consultation__floating--small {
  left: 170px;
  bottom: 18px;
  width: 112px;
  height: 112px;
}

.consultation__pill {
  position: absolute;
  left: 118px;
  top: 120px;
  min-width: 180px;
  min-height: 52px;
  padding: 0 30px;
  border-radius: 999px;
  background: linear-gradient(90deg, #76bbe5 0%, #5b84d6 100%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  box-shadow: 0 18px 30px rgba(91, 132, 214, 0.24);
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
  font-size: 20px;
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
    min-height: 280px;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    background-position: 72% center;
  }

  .hero__inner {
    min-height: auto;
    padding: 164px 0 80px;
  }

  .hero__content {
    max-width: 100%;
  }

  .services {
    margin-top: -34px;
  }

  .services__grid {
    grid-template-columns: 1fr;
  }

  .consultation__pill {
    left: 90px;
    min-width: 150px;
  }

  .footer__title {
    font-size: 28px;
  }

  .footer__map,
  .footer__map iframe {
    min-height: 360px;
  }
}
</style>
