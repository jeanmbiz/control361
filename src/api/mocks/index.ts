import { setupWorker } from 'msw/browser'

import { env } from '@/env'
import { getVehiclesMock } from './mocke2eVehiclesResponse'

export const worker = setupWorker(getVehiclesMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}