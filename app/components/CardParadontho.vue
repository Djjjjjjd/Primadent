<template>
  <div class="card">
    <div class="card_image">
      <img :src="paradonthoIcon" alt="Пародонтология" />
    </div>
    <div class="card_content">
      <h2 class="card_title">Пародонтология</h2>
      <ul>
        <li class="cardText">Профессиональная гигиена полости рта</li>
        <li class="cardText">Вектор-терапия</li>
        <li class="cardText">Плазмолифтинг</li>
        <li class="cardText">Шинирование зубов</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/card.css'
import paradonthoIcon from '~/images/icon/paradontho.svg'
</script>
