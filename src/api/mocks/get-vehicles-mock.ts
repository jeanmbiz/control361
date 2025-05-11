import { http, HttpResponse } from 'msw'
import type { LocationVehicle, Vehicle } from '../get-vehicles'

const vehicleTypes = ['tracked', 'others']

const statuses = ['active', 'inactive']

const vehicles: Vehicle[] = Array.from({ length: 80 }).map((_, i) => {
  const typeIndex = i < 40 ? 0 : 1
  const statusIndex = i % 4
  const fleetOptions = ['Fleet A', 'Fleet B', 'Fleet C', null]
  const fleetIndex = i % 4

  return {
    id: `vehicle-${i + 1}`,
    plate: `ABC${1000 + i}`,
    fleet: fleetOptions[fleetIndex],
    type: vehicleTypes[typeIndex],
    model: `Model ${Math.floor(i / 10) + 1}`,
    nameOwner: `Owner ${(i % 20) + 1}`,
    status: statuses[statusIndex],
    createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  }
})

const locationVehicles: LocationVehicle[] = Array.from({ length: 50 }).map(
  (_, i) => {
    const fleetOptions = ['Fleet A', 'Fleet B', 'Fleet C']
    const fleetIndex = i % 3
    const ignitionOptions = ['on', 'off']
    const ignitionIndex = i % 2

    return {
      id: `location-${i + 1}`,
      fleet: fleetOptions[fleetIndex],
      equipmentId: `vehicle-${i + 1}`,
      name: `Vehicle ${i + 1}`,
      plate: `ABC${1000 + i}`,
      ignition: ignitionOptions[ignitionIndex],
      lat: -23.55052 + (Math.random() - 0.5) * 0.1,
      lng: -46.633308 + (Math.random() - 0.5) * 0.1,
      createdAt: new Date().toISOString(),
    }
  }
)

export const getVehiclesMock = http.get(
  /\/recruitment\/vehicles\/list-with-paginate.*/,
  async ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
      ? Number(url.searchParams.get('page'))
      : 1
    const type = url.searchParams.get('type')
    const perPage = url.searchParams.get('perPage')
      ? Number(url.searchParams.get('perPage'))
      : 20

    let filteredVehicles = [...vehicles]
    if (type && vehicleTypes.includes(type)) {
      filteredVehicles = filteredVehicles.filter(
        vehicle => vehicle.type === type
      )
    }

    const totalPages = Math.ceil(filteredVehicles.length / perPage)

    const paginatedVehicles = filteredVehicles.slice(
      (page - 1) * perPage,
      page * perPage
    )

    return HttpResponse.json({
      message: 'Vehicles retrieved successfully',
      statusCode: 200,
      content: {
        vehicles: paginatedVehicles,
        locationVehicles: locationVehicles.filter(location =>
          paginatedVehicles.some(vehicle => vehicle.id === location.equipmentId)
        ),
        totalPages,
        page,
        perPage,
      },
    })
  }
)
