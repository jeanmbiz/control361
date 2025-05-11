import { api } from '@/lib/axios'

export interface Vehicle {
  id: string
  plate: string
  fleet: string | null
  type: string
  model: string
  nameOwner: string
  status: string
  createdAt: string
}

export interface LocationVehicle {
  id: string
  fleet: string
  equipmentId: string
  name: string
  plate: string
  ignition: string
  lat: number
  lng: number
  createdAt: string
}

export interface GetVehiclesResponse {
  message: string
  statusCode: number
  content: {
    vehicles: Vehicle[]
    locationVehicles?: LocationVehicle[]
    totalPages: number
    page: number
    perPage: number
  }
}

interface GetVehiclesParams {
  page: number
  type: string
}

export async function getVehicles({ page = 1, type }: GetVehiclesParams) {
  const response = await api.get<GetVehiclesResponse>(
    `/recruitment/vehicles/list-with-paginate?type=${type}&page=${page}&perPage=20`
  )

  return response.data
}
