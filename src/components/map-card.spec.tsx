import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MapCard } from './map-card'
import '@testing-library/jest-dom'
import { useVehiclesMapQuery } from '@/queries/useVehiclesMapQuery'

vi.mock('@/queries/useVehiclesMapQuery', () => ({
  useVehiclesMapQuery: vi.fn(() => ({
    mapVehicles: {
      content: {
        locationVehicles: [
          {
            id: '1',
            plate: 'ABC1234',
            fleet: '001',
            lat: -23.5505,
            lng: -46.6333,
            type: 'truck',
            status: 'active',
          },
          {
            id: '2',
            plate: 'XYZ5678',
            fleet: '002',
            lat: -23.5605,
            lng: -46.6433,
            type: 'car',
            status: 'active',
          },
        ],
      },
    },
    isLoadingMap: false,
    isFetchingMap: false,
  })),
}))

vi.mock('@vis.gl/react-google-maps', () => ({
  Map: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
  useMap: vi.fn(() => ({
    fitBounds: vi.fn(),
  })),
  AdvancedMarker: ({
    children,
    onClick,
  }: { children: React.ReactNode; onClick?: () => void }) => (
    <div
      data-testid="advanced-marker"
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
    >
      {children}
    </div>
  ),
  AdvancedMarkerAnchorPoint: {
    BOTTOM_CENTER: 'bottom-center',
  },
  InfoWindow: ({
    children,
    onClose,
  }: { children: React.ReactNode; onClose?: () => void }) => (
    <div
      data-testid="info-window"
      onClick={onClose}
      onKeyDown={e => e.key === 'Enter' && onClose?.()}
    >
      {children}
    </div>
  ),
  useAdvancedMarkerRef: vi.fn(() => [vi.fn(), 'marker-instance']),
}))

describe('MapCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should show loading spinner when isLoadingMap is true', () => {
    vi.mocked(useVehiclesMapQuery).mockReturnValueOnce({
      mapVehicles: undefined,
      isLoadingMap: true,
      isFetchingMap: false,
    })
    render(<MapCard />)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('should show refresh indicator when isFetching Map is true', () => {
    vi.mocked(useVehiclesMapQuery).mockReturnValueOnce({
      mapVehicles: {
        message: 'Success',
        statusCode: 200,
        content: {
          vehicles: [],
          locationVehicles: [],
          totalPages: 1,
          page: 1,
          perPage: 10,
        },
      },
      isLoadingMap: false,
      isFetchingMap: true,
    })
    render(<MapCard />)
    expect(screen.getByText('Atualizando...')).toBeInTheDocument()
  })
})
