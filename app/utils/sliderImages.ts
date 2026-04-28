type SliderImage = {
  id: number
  src: string
  alt: string
}

const galleryImageModules = import.meta.glob<string>('../images/slider/gallery/*.jpg', {
  eager: true,
  import: 'default',
})

const heroImageModules = import.meta.glob<string>('../images/slider/hero/*.jpg', {
  eager: true,
  import: 'default',
})

const toSliderImages = (modules: Record<string, string>, altPrefix: string): SliderImage[] => {
  return Object.entries(modules)
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
    .map(([, src], index) => ({
      id: index + 1,
      src,
      alt: `${altPrefix} ${index + 1}`,
    }))
}

export const galleryImages = toSliderImages(galleryImageModules, 'Фото клиники Primadent')
export const heroImages = toSliderImages(heroImageModules, 'Фото клиники Primadent')
