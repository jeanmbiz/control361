import { setupWorker } from 'msw/browser'

import { env } from '@/env'
import { getVehiclesMock } from './get-vehicles-mock'

export const worker = setupWorker(getVehiclesMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
