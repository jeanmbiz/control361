import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_ENABLE_API_DELAY: z.string().transform(value => value === 'true'),
  VITE_GOOGLE_MAPS_API_KEY: z.string(),
  VITE_GOOGLE_MAP_ID: z.string(),
  VITE_CONTROL361_API_TOKEN: z.string(),
})

export const env = envSchema.parse(import.meta.env)
