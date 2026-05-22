import { toSliderImages } from './toSliderImages'

const heroImageModules = import.meta.glob<string>('../images/archive/*.jpg', {
  eager: true,
  import: 'default',
})

export const heroImages = toSliderImages(heroImageModules, 'Фото клиники Primadent')
