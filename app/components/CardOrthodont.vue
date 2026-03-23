<template>
  <div class="card">
    <div class="card_image">
      <img :src="orthodontIcon" alt="Ортодонтия" />
    </div>
    <div class="card_content">
      <h2 class="card_title">Ортодонтия</h2>
      <ul>
        <li class="cardText">Установка брекет-систем</li>
        <li class="cardText">Исправление прикуса</li>
        <li class="cardText">Ортодонтические аппараты</li>
        <li class="cardText">Фиксация ретейнеров</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/card.css'
import orthodontIcon from '~/images/icon/orthodont.svg'
</script>
