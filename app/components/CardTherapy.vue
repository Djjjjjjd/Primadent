<template>
  <div class="card">
    <div class="card_image">
      <img :src="therapyIcon" alt="Терапия" />
    </div>
    <div class="card_content">
      <h2 class="card_title">Терапия</h2>
      <ul>
        <li class="cardText">Косметическая реставрация</li>
        <li class="cardText">Лечение кариеса и осложнений</li>
        <li class="cardText">Перелечивание каналов под микроскопом</li>
        <li class="cardText">Извлечение сломанного инструмента</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/card.css'
import therapyIcon from '~/images/icon/therapy.svg'
</script>
