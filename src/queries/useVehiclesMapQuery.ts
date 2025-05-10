import { getMapVehicles } from '@/api/get-map-vehicles'
import { useVehicleStore } from '@/store/vehiclesStore'
import { useQuery } from '@tanstack/react-query'

export function useVehiclesMapQuery() {
  const mapRefetchInterval = useVehicleStore(state => state.mapRefetchInterval)
  const mapStaleTime = useVehicleStore(state => state.mapStaleTime)
  const {
    data: mapVehicles,
    isLoading: isLoadingMap,
    isFetching: isFetchingMap,
  } = useQuery({
    queryKey: ['mapVehicles'],
    queryFn: getMapVehicles,
    refetchInterval: mapRefetchInterval, // 2 minutos
    staleTime: mapStaleTime, // 1:50 minuto
  })

  return {
    mapVehicles,
    isLoadingMap,
    isFetchingMap,
  }
}
