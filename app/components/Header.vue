<template>
  <div class="wrapper">
    <div class="header">
      <div class="logo">
        <img src="/images/icon/logo_black.svg" alt="Logo" style="padding-top:13px;">
      </div>
      <div class="header_links">
        <a href="https://yandex.com/maps/-/CDRAyD82" class="link_hover">83015, г.Донецк, ул. Челюскинцев, 167</a>
        <a href="tel:+79493455165" class="link_hover">+7(949) 345-51-65</a>
        <a href="" class="button">Контакы</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.header_links{
  position: absolute;
  left: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.header {
  position: relative;
  z-index: 10;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
}

/* ВОТ МАГИЯ */
.logo {
  position: absolute;
  bottom: -80px; /* выталкиваем вниз */
  z-index: 20;
}
</style>