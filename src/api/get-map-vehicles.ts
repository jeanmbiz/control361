import { api } from '@/lib/axios'
import type { GetVehiclesResponse } from './get-vehicles'

export async function getMapVehicles() {
  const response = await api.get<GetVehiclesResponse>(
    '/recruitment/vehicles/list-with-paginate?type=tracked&page=1&perPage=100'
  )

  return response.data
}
