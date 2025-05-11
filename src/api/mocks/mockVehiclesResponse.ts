import type { GetVehiclesResponse } from '@/api/get-vehicles'

export const createMockVehiclesResponse = (
  page = 1,
  totalPages = 2,
  type: 'vehicle' | 'implement' = 'vehicle'
): GetVehiclesResponse => {
  return {
    message: 'Success',
    statusCode: 200,
    content: {
      page,
      totalPages,
      perPage: 20,
      vehicles: [
        {
          id: type === 'vehicle' ? '1' : '2',
          plate: type === 'vehicle' ? 'ABC1234' : 'DEF5678',
          fleet: type === 'vehicle' ? '101' : '102',
          type,
          model: type === 'vehicle' ? 'Gol' : 'Carreta',
          nameOwner: type === 'vehicle' ? 'João' : 'Maria',
          status: type === 'vehicle' ? 'active' : 'inactive',
          createdAt:
            type === 'vehicle'
              ? '2024-01-01T00:00:00Z'
              : '2024-01-02T00:00:00Z',
        },
      ],
    },
  }
}

export const mockVehicleResponse = createMockVehiclesResponse(1, 2, 'vehicle')
export const mockLastPageResponse = createMockVehiclesResponse(
  2,
  2,
  'implement'
)
