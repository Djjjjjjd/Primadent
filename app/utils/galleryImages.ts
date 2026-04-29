import { toSliderImages } from './toSliderImages'

const galleryImageModules = import.meta.glob<string>('../images/slider/gallery/*.jpg', {
  eager: true,
  import: 'default',
})

export const galleryImages = toSliderImages(galleryImageModules, 'Фото клиники Primadent')
