import { getMapVehicles } from '@/api/get-map-vehicles'
import { useQuery } from '@tanstack/react-query'

export function useVehiclesMapQuery() {
  const {
    data: mapVehicles,
    isLoading: isLoadingMap,
    isFetching: isFetchingMap,
  } = useQuery({
    queryKey: ['mapVehicles'],
    queryFn: getMapVehicles,
    refetchInterval: 120000, // 2 minutos
    staleTime: 110000, // 1:50 minuto
  })

  return {
    mapVehicles,
    isLoadingMap,
    isFetchingMap,
  }
}
