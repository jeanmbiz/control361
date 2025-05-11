import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useVehiclesQuery } from '@/queries/useVehiclesQuery'
import { useEffect, useRef } from 'react'
import { Spinner } from './spinner'
import { VehiclesTableRow } from './vehicle-table-row'

export function Vehicles() {
  const {
    vehicles,
    fetchNextPageVehicles,
    hasNextPageVehicles,
    isFetchingNextPageVehicles,
  } = useVehiclesQuery()

  const loaderRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0]?.isIntersecting &&
          hasNextPageVehicles &&
          !isFetchingNextPageVehicles
        ) {
          fetchNextPageVehicles()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPageVehicles, hasNextPageVehicles, isFetchingNextPageVehicles])

  return (
    <>
      <div className="space-y-2.5">
        <div className="border rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Placa
                </TableHead>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Frota
                </TableHead>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Tipo
                </TableHead>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Modelo
                </TableHead>
                <TableHead className="w-[140px] text-center text-lg font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles?.map(page =>
                page.content.vehicles.map(vehicle => (
                  <VehiclesTableRow key={vehicle.id} vehicle={vehicle} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div
          data-testid="loader"
          ref={loaderRef}
          className="py-4 text-center text-muted-foreground"
        >
          {isFetchingNextPageVehicles ? (
            'Carregando mais veículos...'
          ) : vehicles?.length ? (
            'Fim da lista'
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  )
}
