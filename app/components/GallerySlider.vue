<template>
  <section class="gallery-slider">
    <div class="wrapper">
      <div class="gallery-slider__head">
        <h2 class="section-title gallery-slider__title">Галерея</h2>
      </div>

      <div class="slider-shell">
        <button ref="prevBtn" class="slider-btn slider-btn--prev" aria-label="Назад">
          <span>&larr;</span>
        </button>

        <Swiper
          :modules="[Navigation, Mousewheel]"
          slides-per-view="auto"
          :slides-per-group="1"
          :space-between="18"
          :loop="true"
          :speed="600"
          :grab-cursor="true"
          :mousewheel="{ forceToAxis: true, releaseOnEdges: true }"
          :navigation="{ prevEl: prevBtn, nextEl: nextBtn }"
          @swiper="onSwiper"
          class="gallery-swiper"
        >
          <SwiperSlide v-for="image in images" :key="image.id" class="gallery-slide">
            <article class="gallery-card">
              <img :src="image.src" :alt="image.alt" />
            </article>
          </SwiperSlide>
        </Swiper>

        <button ref="nextBtn" class="slider-btn slider-btn--next" aria-label="Вперед">
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Navigation } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper/types'
import heroImage from '~/images/hero.webp'
import portraitImage from '~/images/doctors/portrait.jpg'

import 'swiper/css'
import 'swiper/css/navigation'

const prevBtn = ref<HTMLElement | null>(null)
const nextBtn = ref<HTMLElement | null>(null)

const images = [
  { id: 1, src: portraitImage, alt: 'Фото работы 1' },
  { id: 2, src: heroImage, alt: 'Фото работы 2' },
  { id: 3, src: portraitImage, alt: 'Фото работы 3' },
  { id: 4, src: heroImage, alt: 'Фото работы 4' },
  { id: 5, src: portraitImage, alt: 'Фото работы 5' },
]

const onSwiper = async (swiper: SwiperInstance) => {
  await nextTick()

  if (!swiper.params.navigation || !prevBtn.value || !nextBtn.value) {
    return
  }

  swiper.params.navigation.prevEl = prevBtn.value
  swiper.params.navigation.nextEl = nextBtn.value
  swiper.navigation.destroy()
  swiper.navigation.init()
  swiper.navigation.update()
}
</script>

<style scoped>
.gallery-slider {
  padding: 18px 0 94px;
}

.gallery-slider__head {
  text-align: left;
  margin-bottom: 40px;
}

.gallery-slider__title {
  margin-bottom: 0;
}

.slider-shell {
  position: relative;
}

.slider-shell::before,
.slider-shell::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 4;
  pointer-events: none;
}

.slider-shell::before {
  left: 0;
  background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.slider-shell::after {
  right: 0;
  background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.slider-btn {
  position: absolute;
  top: 50%;
  z-index: 6;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 1px solid rgba(102, 119, 153, 0.18);
  background: #fff;
  color: #667799;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(28, 35, 50, 0.08);
  transform: translateY(-50%);
}

.slider-btn--prev {
  left: 0;
}

.slider-btn--next {
  right: 0;
}

.gallery-swiper {
  padding: 0 72px;
  overflow: hidden;
}

.gallery-slide {
  width: 380px;
  flex-shrink: 0;
}

.gallery-card {
  width: 380px;
  max-width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  background: #edf1f7;
  box-shadow: 0 12px 30px rgba(28, 35, 50, 0.08);
}

.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 767px) {
  .gallery-slider {
    padding: 12px 0 72px;
  }

  .slider-shell::before,
  .slider-shell::after {
    width: 52px;
  }

  .slider-btn {
    width: 42px;
    height: 42px;
  }

  .gallery-swiper {
    padding: 0 36px;
  }

  .gallery-slide {
    width: calc(100vw - 72px);
    max-width: 380px;
  }

  .gallery-card {
    width: 100%;
    height: 240px;
  }
}
</style>
