<template>
  <div class="card">
    <div class="card_image">
      <img :src="surgicalIcon" alt="Хирургия" />
    </div>
    <div class="card_content">
      <h2 class="card_title">Хирургия</h2>
      <ul>
        <li class="cardText">Удаление зубов</li>
        <li class="cardText">Пластика мягких тканей</li>
        <li class="cardText">Костная пластика</li>
        <li class="cardText">Имплантация</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/card.css'
import surgicalIcon from '~/images/icon/surgical.svg'
</script>
