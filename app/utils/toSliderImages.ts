export type SliderImage = {
  id: number
  src: string
  alt: string
}

export const toSliderImages = (modules: Record<string, string>, altPrefix: string): SliderImage[] => {
  return Object.entries(modules)
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
    .map(([, src], index) => ({
      id: index + 1,
      src,
      alt: `${altPrefix} ${index + 1}`,
    }))
}
