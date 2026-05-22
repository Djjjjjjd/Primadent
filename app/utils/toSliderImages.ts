export type SliderImage = {
  id: number
  src: string
  alt: string
}

const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }
  return result
}

export const toSliderImages = (modules: Record<string, string>, altPrefix: string): SliderImage[] => {
  const srcs = Object.values(modules)
  return shuffle(srcs).map((src, index) => ({
    id: index + 1,
    src,
    alt: `${altPrefix} ${index + 1}`,
  }))
}
