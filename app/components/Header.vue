<template>
  <header class="site-header">
    <div class="wrapper site-header__inner">
      <a href="/" class="site-header__brand" aria-label="Примадент">
        <img src="/images/icon/logo_black.svg" alt="Примадент" class="site-header__logo" />
      </a>

      <div class="site-header__meta">
        <a href="https://yandex.com/maps/-/CDRAyD82" class="site-header__link">
          83015, г. Донецк, ул. Челюскинцев, 167
        </a>
        <a href="tel:+79493455165" class="site-header__link">
          +7(949) 345-51-65
        </a>
        <a href="#contacts" class="button button--small">Контакты</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 30;
  padding-top: 8px;
  overflow: visible;
}

.site-header__inner {
  min-height: 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: -76px;
}

.site-header__logo {
  width: 350px;
  height: auto;
  display: block;
}

.site-header__meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 28px;
}

.site-header__link:hover {
  color: #1a1a1a;
  text-shadow: 0 0 10px rgba(102, 119, 153, 0.5);
}

@media (max-width: 980px) {
  .site-header {
    position: relative;
    inset: auto;
    padding-top: 0;
    background: #ffffff;
  }

  .site-header__inner {
    min-height: 88px;
    justify-content: flex-start;
  }

  .site-header__meta {
    display: none;
  }

  .site-header__logo {
    width: 188px;
  }

  .site-header__brand {
    margin-bottom: 0;
  }
}

@media (max-width: 640px) {
  .site-header__meta {
    font-size: 13px;
  }
}
</style>
