import { type GetVehiclesResponse, getVehicles } from '@/api/get-vehicles'
import { useVehicleStore } from '@/store/vehiclesStore'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useVehiclesQuery() {
  const type = useVehicleStore(state => state.type)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<GetVehiclesResponse>({
    queryKey: ['vehicles', type],
    queryFn: async ({ pageParam }) => {
      const response = await getVehicles({ page: pageParam as number, type })
      return response
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.content.page < lastPage.content.totalPages) {
        return lastPage.content.page + 1
      }
      return undefined
    },
  })

  return {
    vehicles: data?.pages,
    fetchNextPageVehicles: fetchNextPage,
    hasNextPageVehicles: hasNextPage,
    isFetchingNextPageVehicles: isFetchingNextPage,
    isLoading,
    isError,
    error,
  }
}
