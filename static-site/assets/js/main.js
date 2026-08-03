const CONTACT_API = 'https://primadent-api.onrender.com/api/contact'
const HERO_SLIDE_INTERVAL = 2000
const NAME_PATTERN = /^[A-Za-z\u0410-\u042F\u0430-\u044F\u0401\u0451\s-]{2,80}$/
const PHONE_PATTERN = /^[+\d\s()-]+$/
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

const text = {
  nameRequired: 'Enter your name.',
  nameInvalid: 'Name must be 2-80 characters long.',
  phoneRequired: 'Enter your phone or Telegram number.',
  phoneInvalid: 'Enter a valid phone or Telegram number.',
  checkFields: 'Please check the form fields.',
  submit: 'Send',
  sending: 'Sending...',
  sendError: 'Could not send the request. Please try again.',
  genericError: 'Send error',
  heroAlt: 'Primadent clinic photo',
}

const heroImages = [
  '/assets/images/archive/5212948124266079532.jpg',
  '/assets/images/archive/5212948124266079542.jpg',
  '/assets/images/archive/5212948124266079543.jpg',
  '/assets/images/archive/5212948124266079545.jpg',
  '/assets/images/archive/5212948124266079546.jpg',
  '/assets/images/archive/5212948124266079547.jpg',
  '/assets/images/archive/5212948124266079548.jpg',
  '/assets/images/archive/5212948124266079550.jpg',
  '/assets/images/archive/5212948124266079551.jpg',
  '/assets/images/archive/5212948124266079573.jpg',
]

const normalizeSpaces = (value) => value.replace(/\s+/g, ' ').trim()

const setError = (form, field, message) => {
  const input = form.elements[field]
  const target = form.querySelector(`[data-error-for="${field}"]`)

  input?.classList.toggle('input--error', Boolean(message))
  if (target) {
    target.textContent = message
  }
}

const validateLeadForm = (form) => {
  const name = normalizeSpaces(String(form.elements.name?.value || ''))
  const phone = normalizeSpaces(String(form.elements.phone?.value || ''))
  const phoneDigits = phone.replace(/\D/g, '')
  let isValid = true

  setError(form, 'name', '')
  setError(form, 'phone', '')

  if (!name) {
    setError(form, 'name', text.nameRequired)
    isValid = false
  } else if (!NAME_PATTERN.test(name)) {
    setError(form, 'name', text.nameInvalid)
    isValid = false
  }

  if (!phone) {
    setError(form, 'phone', text.phoneRequired)
    isValid = false
  } else if (!PHONE_PATTERN.test(phone) || phoneDigits.length < PHONE_DIGITS_MIN || phoneDigits.length > PHONE_DIGITS_MAX) {
    setError(form, 'phone', text.phoneInvalid)
    isValid = false
  }

  if (isValid) {
    form.elements.name.value = name
    form.elements.phone.value = phone
  }

  return isValid
}

const showToast = () => {
  const toast = document.querySelector('.toast')
  if (!toast) {
    return
  }

  toast.hidden = false
  window.clearTimeout(showToast.timer)
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true
  }, 4200)
}

const markFormStarted = (form) => {
  const startedAt = form.elements.formStartedAt
  if (startedAt && !startedAt.value) {
    startedAt.value = String(Date.now())
  }
}

const setFormStatus = (form, message) => {
  const status = form.querySelector('[data-form-status]')
  if (status) {
    status.textContent = message
  }
}

const initForms = () => {
  document.querySelectorAll('.lead-form').forEach((form) => {
    form.addEventListener('focusin', () => markFormStarted(form))
    form.addEventListener('input', () => markFormStarted(form), { once: true })

    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      markFormStarted(form)
      setFormStatus(form, '')

      if (!validateLeadForm(form)) {
        setFormStatus(form, text.checkFields)
        return
      }

      const submitButton = form.querySelector('button[type="submit"]')
      const defaultText = submitButton?.dataset.defaultText || text.submit

      if (submitButton) {
        submitButton.disabled = true
        submitButton.textContent = text.sending
      }

      try {
        const response = await fetch(CONTACT_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.elements.name.value,
            phone: form.elements.phone.value,
            message: '',
            website: form.elements.website?.value || '',
            formStartedAt: Number(form.elements.formStartedAt?.value || 0),
          }),
        })

        const result = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(result.message || result.error || text.genericError)
        }

        form.reset()
        setFormStatus(form, '')
        showToast()
      } catch (error) {
        setFormStatus(form, error?.message || text.sendError)
      } finally {
        if (submitButton) {
          submitButton.disabled = false
          submitButton.textContent = defaultText
        }
      }
    })
  })
}

const initHeroSlider = () => {
  const slider = document.querySelector('.hero__slider')
  const firstSlide = slider?.querySelector('.hero__slide')

  if (!slider || !firstSlide || heroImages.length < 2) {
    return
  }

  let activeIndex = 0
  heroImages.slice(1).forEach((src) => {
    const image = new Image()
    image.decoding = 'async'
    image.src = src
  })

  window.setInterval(() => {
    activeIndex = (activeIndex + 1) % heroImages.length
    const nextImage = document.createElement('img')
    nextImage.src = heroImages[activeIndex]
    nextImage.alt = text.heroAlt
    nextImage.className = 'hero__slide'
    nextImage.decoding = 'async'

    slider.append(nextImage)
    window.requestAnimationFrame(() => {
      nextImage.classList.add('hero__slide--active')
      slider.querySelectorAll('.hero__slide').forEach((slide) => {
        if (slide !== nextImage) {
          slide.classList.remove('hero__slide--active')
        }
      })
    })

    window.setTimeout(() => {
      slider.querySelectorAll('.hero__slide:not(.hero__slide--active)').forEach((slide) => slide.remove())
    }, 1500)
  }, HERO_SLIDE_INTERVAL)
}

const initGallery = () => {
  const track = document.querySelector('[data-gallery-track]')
  const prev = document.querySelector('.slider-btn--prev')
  const next = document.querySelector('.slider-btn--next')

  if (!track || !prev || !next) {
    return
  }

  const step = () => {
    const slide = track.querySelector('.gallery-slide')
    return slide ? slide.getBoundingClientRect().width + 18 : 318
  }

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -step(), behavior: 'smooth' })
  })

  next.addEventListener('click', () => {
    track.scrollBy({ left: step(), behavior: 'smooth' })
  })
}

const initReveals = () => {
  const page = document.querySelector('.page')
  const revealItems = Array.from(document.querySelectorAll('.reveal, .services .card'))
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  revealItems.forEach((item, index) => {
    item.classList.add('reveal')
    item.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`)
  })

  page?.classList.add('page--reveals-ready')

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('reveal--visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        entry.target.classList.add('reveal--visible')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
  )

  revealItems.forEach((item) => observer.observe(item))
}

document.addEventListener('DOMContentLoaded', () => {
  initForms()
  initHeroSlider()
  initGallery()
  initReveals()
})
