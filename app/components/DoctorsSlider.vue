<template>
  <section class="doctors-slider">
    <div class="wrapper">
      <div class="doctors-slider__head">
        <div>
          <h2 class="section-title doctors-slider__title">Наши специалисты</h2>
        </div>
      </div>

      <div class="slider-shell">
        <button ref="prevBtn" class="slider-btn slider-btn--prev" aria-label="Назад">
          <span>&larr;</span>
        </button>

        <Swiper
          :modules="[Navigation, Mousewheel]"
          slides-per-view="auto"
          :slides-per-group="1"
          :space-between="24"
          :loop="false"
          :rewind="true"
          :watch-slides-progress="true"
          :speed="550"
          :allow-touch-move="true"
          :grab-cursor="true"
          :mousewheel="{ forceToAxis: true, releaseOnEdges: true }"
          :navigation="{ prevEl: prevBtn, nextEl: nextBtn }"
          @swiper="onSwiper"
          class="doctors-swiper"
        >
          <SwiperSlide
            v-for="doctor in selectedDoctors"
            :key="doctor.id"
            class="doctor-slide"
          >
            <article class="doctor-card">
              <div class="doctor-card__image">
                <img :src="doctor.image" :alt="doctor.name" />
              </div>
              <div class="doctor-card__content">
                <h3 class="doctor-card__name">{{ doctor.name }}</h3>
                <p class="doctor-card__role">{{ doctor.role }}</p>
                <p class="doctor-card__desc">{{ doctor.description }}</p>
                <button class="button button--small doctor-card__btn">Записаться</button>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>

        <button ref="nextBtn" class="slider-btn slider-btn--next" aria-label="Вперёд">
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Navigation } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper/types'
import portraitImage from '~/images/doctors/portrait.jpg'

import 'swiper/css'
import 'swiper/css/navigation'

type Doctor = {
  id: number
  name: string
  role: string
  description: string
  image: string
}

const props = defineProps<{
  ids: number[]
}>()

const prevBtn = ref<HTMLElement | null>(null)
const nextBtn = ref<HTMLElement | null>(null)

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

const doctorsBase: Doctor[] = [
  {
    id: 1,
    name: 'Иван Петров',
    role: 'Стоматолог-хирург',
    description: 'Удаление, имплантация и бережное восстановление улыбки.',
    image: portraitImage,
  },
  {
    id: 2,
    name: 'Анна Миронова',
    role: 'Терапевт',
    description: 'Лечение кариеса, реставрации и терапия под микроскопом.',
    image: portraitImage,
  },
  {
    id: 3,
    name: 'Роман Климов',
    role: 'Ортопед',
    description: 'Коронки, виниры и комплексное протезирование с точной посадкой.',
    image: portraitImage,
  },
  {
    id: 4,
    name: 'Елена Савина',
    role: 'Ортодонт',
    description: 'Исправление прикуса, брекет-системы и сопровождение на всех этапах.',
    image: portraitImage,
  },
  {
    id: 5,
    name: 'Мария Волкова',
    role: 'Пародонтолог',
    description: 'Профилактика, гигиена и лечение тканей пародонта.',
    image: portraitImage,
  },
  {
    id: 6,
    name: 'Алексей Орлов',
    role: 'Имплантолог',
    description: 'Планирование имплантации с современными цифровыми протоколами.',
    image: portraitImage,
  },
  {
    id: 7,
    name: 'Ольга Данилова',
    role: 'Гигиенист',
    description: 'Поддерживающий уход и профессиональная чистка для здоровой улыбки.',
    image: portraitImage,
  },
  {
    id: 8,
    name: 'Никита Беляев',
    role: 'Детский стоматолог',
    description: 'Деликатный подход и спокойная атмосфера для маленьких пациентов.',
    image: portraitImage,
  },
]

const selectedDoctors = computed(() => {
  return props.ids
    .map((id) => doctorsBase.find((doctor) => doctor.id === id))
    .filter((doctor): doctor is Doctor => Boolean(doctor))
})
</script>

<style scoped>
.doctors-slider {
  padding: 46px 0 88px;
  background: #ffffff;
}

.doctors-slider__head {
  margin-bottom: 22px;
}

.doctors-slider__title {
  margin-bottom: 40px;
}

.slider-shell {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
}

.slider-shell::before,
.slider-shell::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 180px;
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
  left: max(12px, calc((100vw - 1240px) / 2 + 12px));
}

.slider-btn--next {
  right: max(12px, calc((100vw - 1240px) / 2 + 12px));
}

.doctors-swiper {
  width: min(1240px, calc(100vw - 40px));
  padding: 20px 92px;
  margin: -20px auto;
  overflow: visible;
}

.doctor-slide {
  width: 430px;
  flex-shrink: 0;
}

.doctor-card {
  height: 100%;
  width: 430px;
  max-width: 100%;
  min-height: 640px;
  padding: 40px;
  border-radius: 18px;
  background: var(--surface-color);
  box-shadow: 0 18px 34px rgba(38, 48, 73, 0.12);
}

.doctor-card__image {
  aspect-ratio: 1 / 0.88;
  margin-bottom: 40px;
  overflow: hidden;
  border-radius: 10px;
  background: #edf1f7;
}

.doctor-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.doctor-card__name {
  margin-bottom: 6px;
  font-size: 32px;
}

.doctor-card__role {
  margin-bottom: 10px;
  color: #8a90a0;
  font-size: 20px;
}

.doctor-card__desc {
  margin-bottom: 40px;
  color: #3e4552;
  font-size: 20px;
}

.doctor-card__btn {
  min-width: 122px;
}

@media (max-width: 767px) {
  .doctors-slider {
    padding: 24px 0 56px;
  }

  .slider-shell::before,
  .slider-shell::after {
    width: 36px;
  }

  .slider-btn {
    display: none;
  }

  .doctors-swiper {
    width: calc(100vw - 24px);
    padding: 12px 6px;
    margin: -12px auto;
  }

  .doctor-slide {
    width: calc(100vw - 36px);
    max-width: 430px;
  }

  .doctor-card {
    width: 100%;
    min-height: auto;
    padding: 18px 18px 20px;
    border-radius: 16px;
  }

  .doctor-card__image {
    margin-bottom: 18px;
  }

  .doctor-card__name {
    font-size: 22px;
  }

  .doctor-card__role,
  .doctor-card__desc {
    font-size: 15px;
  }

  .doctor-card__desc {
    margin-bottom: 22px;
  }

  .doctor-card__btn {
    width: 100%;
  }
}
</style>
