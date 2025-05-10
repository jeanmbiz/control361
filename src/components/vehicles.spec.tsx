import { getVehicles } from '@/api/get-vehicles'
import {
  mockLastPageResponse,
  mockVehicleResponse,
} from '@/components/mocks/mockVehiclesResponse'
import { useVehiclesQuery } from '@/queries/useVehiclesQuery'
import { useVehicleStore } from '@/store/vehiclesStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/api/get-vehicles', () => ({
  getVehicles: vi.fn(),
}))

vi.mock('@/store/vehiclesStore', () => ({
  useVehicleStore: vi.fn(),
}))

describe('useVehiclesQuery Hook', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    vi.clearAllMocks()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    vi.mocked(useVehicleStore).mockReturnValue('all')
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should fetch initial vehicles data', async () => {
    vi.mocked(getVehicles).mockResolvedValue(mockVehicleResponse)

    const { result } = renderHook(() => useVehiclesQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.vehicles).toBeDefined()
      expect(result.current.vehicles?.[0]).toEqual(mockVehicleResponse)
      expect(getVehicles).toHaveBeenCalledWith({ page: 1, type: 'all' })
      expect(result.current.hasNextPageVehicles).toBe(true)
    })
  })

  it('should set hasNextPage to false when on last page', async () => {
    vi.mocked(getVehicles).mockResolvedValue(mockLastPageResponse)

    const { result } = renderHook(() => useVehiclesQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.vehicles).toBeDefined()
      expect(result.current.hasNextPageVehicles).toBe(false)
    })
  })

  it('should fetch next page when fetchNextPage is called', async () => {
    vi.mocked(getVehicles)
      .mockResolvedValueOnce(mockVehicleResponse)
      .mockResolvedValueOnce(mockLastPageResponse)

    const { result } = renderHook(() => useVehiclesQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.vehicles).toBeDefined()
    })

    result.current.fetchNextPageVehicles()

    await waitFor(() => {
      expect(getVehicles).toHaveBeenCalledTimes(2)
      expect(getVehicles).toHaveBeenCalledWith({ page: 1, type: 'all' })
      expect(getVehicles).toHaveBeenCalledWith({ page: 2, type: 'all' })
      expect(result.current.vehicles?.length).toBe(2)
      expect(result.current.vehicles?.[0]).toEqual(mockVehicleResponse)
      expect(result.current.vehicles?.[1]).toEqual(mockLastPageResponse)
    })
  })

  it('should filter vehicles by type from store', async () => {
    vi.mocked(useVehicleStore).mockReturnValue('vehicle')
    vi.mocked(getVehicles).mockResolvedValue(mockVehicleResponse)

    const { result } = renderHook(() => useVehiclesQuery(), { wrapper })

    await waitFor(() => {
      expect(getVehicles).toHaveBeenCalledWith({ page: 1, type: 'vehicle' })
      expect(result.current.vehicles?.[0]).toEqual(mockVehicleResponse)
    })
  })

  it('should handle API errors correctly', async () => {
    const mockError = new Error('API error')
    vi.mocked(getVehicles).mockRejectedValue(mockError)

    const { result } = renderHook(() => useVehiclesQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toBe(mockError)
    })
  })

  it('should show loading state initially', () => {
    const { result } = renderHook(() => useVehiclesQuery(), { wrapper })

    expect(result.current.isLoading).toBe(true)
  })
})
