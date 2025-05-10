import { Helmet } from '@dr.pogodin/react-helmet'
import { MapCard } from '../../components/map-card'

import { VehicleTableTypes } from '@/components/vehicle-table-filters'
import { Vehicles } from '@/components/vehicles'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <VehicleTableTypes />
        <MapCard />
        <Vehicles />
      </div>
    </>
  )
}
