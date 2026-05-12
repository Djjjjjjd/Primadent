<template>
  <header class="site-header">
    <div class="wrapper site-header__inner">
      <a href="/" class="site-header__brand" aria-label="Примадент">
        <img :src="logoBlack" alt="Примадент" class="site-header__logo" />
      </a>

      <div class="site-header__meta">
        <a href="https://yandex.com/maps/-/CDRAyD82" class="site-header__link">
          г. Донецк, ул. Челюскинцев, 167
        </a>
        <a href="tel:+79493455165" class="site-header__link">
          +7(949) 345-51-65
        </a>
        <a href="#contacts" class="button button--small">Контакты</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import logoBlack from '~/images/icon/logo_black.svg'
</script>

<style scoped>
.site-header {
  position: absolute;
  inset: 0 0 auto;
  z-index: 30;
  padding-top: 18px;
}

.site-header__inner {
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.site-header__logo {
  width: 248px;
  height: auto;
  display: block;
}

.site-header__meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 28px;
}

.site-header__link {
  position: relative;
  display: inline-flex;
  padding-bottom: 4px;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.site-header__link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.26s ease;
}

.site-header__link:hover {
  color: #1a1a1a;
  text-shadow: 0 0 10px rgba(102, 119, 153, 0.5);
}

.site-header__link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (max-width: 980px) {
  .site-header {
    padding-top: 20px;
  }

  .site-header__inner {
    min-height: 88px;
  }

  .site-header__meta {
    display: none;
  }

  .site-header__logo {
    width: 170px;
  }
}
</style>
