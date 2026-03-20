<template>
  <section class="doctors-slider">
    <div class="container slider-box">
      <button ref="prevBtn" class="slider-btn slider-btn--prev" aria-label="Назад">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <Swiper
        :modules="[Navigation]"
        :slides-per-view="1.15"
        :space-between="16"
        :centered-slides="false"
        :loop="false"
        :speed="600"
        :navigation="{
          prevEl: prevBtn,
          nextEl: nextBtn
        }"
        :breakpoints="{
          640: {
            slidesPerView: 1.4,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 28
          },
          1280: {
            slidesPerView: 3.2,
            spaceBetween: 32
          }
        }"
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
              <button class="doctor-card__btn">Записаться</button>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>

      <button ref="nextBtn" class="slider-btn slider-btn--next" aria-label="Вперед">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

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

const prevBtn = ref(null)
const nextBtn = ref(null)

const doctorsBase: Doctor[] = [
  {
    id: 1,
    name: 'Иван Иванов',
    role: 'Хирург-имплантолог',
    description: 'Специализируется на имплантации и сложных хирургических случаях.',
    image: '/images/doctors/portrait.jpg',
  },
  {
    id: 2,
    name: 'Анна Петрова',
    role: 'Ортодонт',
    description: 'Занимается исправлением прикуса и эстетикой улыбки.',
    image: '/images/doctors/portrait.jpg',
  },
  {
    id: 3,
    name: 'Максим Сидоров',
    role: 'Стоматолог-терапевт',
    description: 'Лечение кариеса, реставрации и профилактика.',
    image: '/images/doctors/portrait.jpg',
  },
  {
    id: 4,
    name: 'Елена Смирнова',
    role: 'Ортопед',
    description: 'Протезирование, виниры, коронки и эстетическая реабилитация.',
    image: '/images/doctors/portrait.jpg',
  },
  {
    id: 5,
    name: 'Дмитрий Орлов',
    role: 'Пародонтолог',
    description: 'Лечение десен и комплексная работа с мягкими тканями.',
    image: '/images/doctors/portrait.jpg',
  },
]

const selectedDoctors = computed(() => {
  return props.ids
    .map(id => doctorsBase.find(doctor => doctor.id === id))
    .filter((doctor): doctor is Doctor => Boolean(doctor))
})
</script>

<style scoped>


/* контейнер */
.container {
  width: min(1440px, calc(100% - 40px));
  margin: 0 auto;
}
.slider-box {
  position: relative;
}
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;

  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 1px solid #cfd6e4;
  background: #ffffff;
  color: #7583a4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 8px 24px rgba(19, 28, 50, 0.08);
}
.slider-btn--prev {
  left: 0;
}

.slider-btn--next {
  right: 0;
} 
.slider-btn:hover {
  background: #7583a4;
  color: #ffffff;
  border-color: #7583a4;
}
.slider-box::before,
.slider-box::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 15;
  pointer-events: none;
}
.slider-box::before {
  left: 0;
  background: linear-gradient(to right, #f5f5f5 0%, rgba(245, 245, 245, 0) 100%);
}

.slider-box::after {
  right: 0;
  background: linear-gradient(to left, #f5f5f5 0%, rgba(245, 245, 245, 0) 100%);
}


.doctors-swiper {
  overflow: hidden;
  padding: 18px 70px 10px;
}
.doctors-slider {
  padding: 80px 0;
  background: #f5f5f5;
  overflow: hidden;
}
/* slide */
.doctor-slide {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* все карточки по умолчанию слегка блеклые */
.doctor-slide .doctor-card {
  opacity: 0.45;
  transform: scale(0.96);
}

/* активная центральная карточка */
.doctor-slide.swiper-slide-active .doctor-card {
  opacity: 1;
  transform: scale(1);
}

.doctor-slide.swiper-slide-next .doctor-card,
.doctor-slide.swiper-slide-prev .doctor-card {
  opacity: 0.7;
  transform: scale(0.98);
}

.doctor-card {
  background: #fff;
  border-radius: 24px;
  padding: 22px;
  min-height: 460px;
  box-shadow: 0 8px 30px rgba(20, 20, 20, 0.08);
  transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
}

.doctor-slide.swiper-slide-active .doctor-card {
  box-shadow: 0 12px 40px rgba(20, 20, 20, 0.12);
}

.doctor-card__image {
  border-radius: 16px;
  overflow: hidden;
  background: #f1f3f7;
  margin-bottom: 22px;
  aspect-ratio: 1 / 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.doctor-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.doctor-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.doctor-card__name {
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
  color: #111111;
  margin-bottom: 8px;
}

.doctor-card__role {
  font-size: 24px;
  line-height: 1.2;
  color: #7583a4;
  margin-bottom: 20px;
}

.doctor-card__desc {
  font-size: 22px;
  line-height: 1.4;
  color: #2c2c2c;
  margin-bottom: 28px;
}

.doctor-card__btn {
  border: none;
  border-radius: 10px;
  padding: 14px 22px;
  background: #7583a4;
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: 0.25s ease;
}

.doctor-card__btn:hover {
  opacity: 0.9;
}

@media (max-width: 1024px) {ы

  .doctor-card {
    min-height: 400px;
  }

  .doctor-card__name {
    font-size: 28px;
  }

  .doctor-card__role {
    font-size: 20px;
  }

  .doctor-card__desc {
    font-size: 18px;
  }

  .doctor-card__btn {
    font-size: 17px;
  }
}

@media (max-width: 640px) {
  .doctors-slider {
    padding: 56px 0;
  }

  .container {
    width: min(100%, calc(100% - 24px));
  }

  .doctor-card {
    padding: 16px;
    border-radius: 20px;
    min-height: auto;
  }

  .doctor-card__name {
    font-size: 24px;
  }

  .doctor-card__role {
    font-size: 17px;
  }

  .doctor-card__desc {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .doctor-card__btn {
    font-size: 15px;
    padding: 12px 18px;
  }
}
</style>