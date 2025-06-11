import { setupWorker } from 'msw/browser'

import { getVehiclesMock } from './get-vehicles-mock'

export const worker = setupWorker(getVehiclesMock)

export async function enableMSW() {
  await worker.start()
}
