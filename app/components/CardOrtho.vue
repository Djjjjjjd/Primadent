<template>
  <div class="card">
    <div class="card_image">
      <img :src="orthoIcon" alt="Ортопедия" />
    </div>
    <div class="card_content">
      <h2 class="card_title">Ортопедия</h2>
      <ul>
        <li class="cardText">Коронки</li>
        <li class="cardText">Полукоронки</li>
        <li class="cardText">Виниры и вкладки</li>
        <li class="cardText">Тотальное протезирование</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/card.css'
import orthoIcon from '~/images/icon/ortho.svg'
</script>
