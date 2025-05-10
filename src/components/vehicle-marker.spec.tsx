import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { VehicleMarker } from './vehicle-marker'

vi.mock('@vis.gl/react-google-maps', () => ({
  AdvancedMarker: ({
    children,
    onClick,
  }: { children: React.ReactNode; onClick: () => void }) => (
    <button
      type="button"
      data-testid="advanced-marker"
      onClick={onClick}
      onKeyUp={e => e.key === 'Enter' && onClick()}
      style={{ all: 'unset', cursor: 'pointer' }}
    >
      {children}
    </button>
  ),
  InfoWindow: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="info-window">{children}</div>
  ),
  useAdvancedMarkerRef: () => {
    const ref = { current: {} }
    const instance = { position: { lat: 10, lng: 20 } }
    return [ref, instance]
  },
  AdvancedMarkerAnchorPoint: {
    CENTER: 'center',
  },
}))

vi.mock('lucide-react', () => ({
  Truck: () => <div data-testid="truck-icon">Truck Icon</div>,
}))

describe('VehicleMarker', () => {
  const mockVehicle = {
    id: '1',
    fleet: 'F001',
    equipmentId: 'E001',
    name: 'Test Vehicle',
    plate: 'ABC1234',
    ignition: 'on',
    lat: 10,
    lng: 20,
    createdAt: '2023-01-01',
  }

  const mockOnClick = vi.fn()
  const mockOnClose = vi.fn()
  const mockOnMarkerRef = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the vehicle marker', () => {
    render(
      <VehicleMarker
        vehicle={mockVehicle}
        onClick={mockOnClick}
        isInfoWindowOpen={false}
        onClose={mockOnClose}
        onMarkerRef={mockOnMarkerRef}
      />
    )

    expect(screen.getByTestId('advanced-marker')).toBeInTheDocument()
    expect(screen.getByTestId('truck-icon')).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    render(
      <VehicleMarker
        vehicle={mockVehicle}
        onClick={mockOnClick}
        isInfoWindowOpen={false}
        onClose={mockOnClose}
        onMarkerRef={mockOnMarkerRef}
      />
    )

    await userEvent.click(screen.getByTestId('advanced-marker'))
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('should show InfoWindow when isInfoWindowOpen is true', () => {
    render(
      <VehicleMarker
        vehicle={mockVehicle}
        onClick={mockOnClick}
        isInfoWindowOpen={true}
        onClose={mockOnClose}
        onMarkerRef={mockOnMarkerRef}
      />
    )

    expect(screen.getByTestId('info-window')).toBeInTheDocument()
    expect(screen.getByText(`Placa ${mockVehicle.plate}`)).toBeInTheDocument()
    expect(screen.getByText(`Frota ${mockVehicle.fleet}`)).toBeInTheDocument()
  })
})
