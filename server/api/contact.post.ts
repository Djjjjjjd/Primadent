import { handleContactRequest } from '../utils/contact'

export default defineEventHandler((event) => {
  return handleContactRequest(event)
})
