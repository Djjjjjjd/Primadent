<template>
  <div class="hero">
    <section class="text_section wrapper">
      <p>Лицензия - <span style="color: #667799;">ЛО41-01709-93/02968061</span></p>
      <h1 class="title" style="margin-bottom: 30px;">Запишитесь на консультацию</h1>
      <p class="subtitle">Мы свяжемся с вами, ответим на вопросы и подберём удобное время для посещения клиники.</p>
    </section>
    <section class="input_section wrapper">
      <input type="text" placeholder="Ваше имя" class="input">
      <input type="text" placeholder="Ваш телефон" class="input">
      <a href="#" style="padding: 20px 90px; margin-top: 20px;" class="button">Записаться</a>
    </section>
  </div>
  <div class="about_us">
    <section class="wrapper us_grid">
      <CardSurgical></CardSurgical>
      <CardTherapy></CardTherapy>
      <CardOrtho></CardOrtho>
      <CardParadontho></CardParadontho>
      <CardOrthodont></CardOrthodont>
    </section>
  </div>
  <div class="doctors">
    <DoctorsSlider :ids="[1, 2, 3, 4, 5]" />
  </div>
</template>

<script lang="ts" setup>
import CardSurgical from '~/components/CardSurgical.vue';
import CardTherapy from '~/components/CardTherapy.vue';
import CardOrtho from '~/components/CardOrtho.vue';
import CardParadontho from '~/components/CardParadontho.vue';
import CardOrthodont from '~/components/CardOrthodont.vue';
import DoctorsSlider from '~/components/DoctorsSlider.vue'
</script>

<style>
/* Hero */
.hero{
  background: url(/images/hero.webp) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  padding-top: 10%;
  position: relative;
  z-index: 1;
}
.input_section{
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
}
/* About Us */
.about_us{
  position: relative;
  margin-top: -100px; /* регулируй сколько нужно */
  z-index: 2;
}
.us_grid{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 24px;
  align-items: stretch;
}
.card:last-child{
  grid-column: 1 / -1;
  justify-self: center;
  max-width: 700px;
}

</style>