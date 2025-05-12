import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { VehicleMarker } from './vehicle-marker'

vi.mock('@vis.gl/react-google-maps', () => ({
  AdvancedMarker: ({ children, onClick }: any) => (
    <div
      data-testid="advanced-marker"
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
    >
      {children}
    </div>
  ),
  AdvancedMarkerAnchorPoint: {
    BOTTOM_CENTER: 'BOTTOM_CENTER',
  },
  InfoWindow: ({ children }: any) => (
    <div data-testid="info-window">{children}</div>
  ),
  useAdvancedMarkerRef: () => {
    const ref = React.createRef<HTMLDivElement>()
    return [ref, {}]
  },
}))

describe('VehicleMarker', () => {
  const vehicle = {
    id: '123',
    fleet: 'Test Fleet',
    equipmentId: '456',
    name: 'Test Vehicle',
    plate: 'ABC1234',
    ignition: 'on',
    lat: -23.55052,
    lng: -46.633308,
    createdAt: '2023-01-01T12:00:00Z',
  }

  it('should render a marker', () => {
    const onClick = vi.fn()
    const onClose = vi.fn()
    const onMarkerRef = vi.fn()

    render(
      <VehicleMarker
        vehicle={vehicle}
        onClick={onClick}
        isInfoWindowOpen={false}
        onClose={onClose}
        onMarkerRef={onMarkerRef}
        markerColor="chart3"
      />
    )

    expect(screen.getByTestId('advanced-marker')).toBeInTheDocument()
  })

  it('should call onClick when marker is clicked', async () => {
    const onClick = vi.fn()
    const onClose = vi.fn()
    const onMarkerRef = vi.fn()
    const user = userEvent.setup()

    render(
      <VehicleMarker
        vehicle={vehicle}
        onClick={onClick}
        isInfoWindowOpen={false}
        onClose={onClose}
        onMarkerRef={onMarkerRef}
        markerColor="chart3"
      />
    )

    await user.click(screen.getByTestId('advanced-marker'))
    expect(onClick).toHaveBeenCalled()
  })

  it('should display info window when isInfoWindowOpen is true', () => {
    const onClick = vi.fn()
    const onClose = vi.fn()
    const onMarkerRef = vi.fn()

    render(
      <VehicleMarker
        vehicle={vehicle}
        onClick={onClick}
        isInfoWindowOpen={true}
        onClose={onClose}
        onMarkerRef={onMarkerRef}
        markerColor="chart3"
      />
    )

    expect(screen.getByTestId('info-window')).toBeInTheDocument()
    expect(screen.getByText(`Placa ${vehicle.plate}`)).toBeInTheDocument()
    expect(screen.getByText(`Frota ${vehicle.fleet}`)).toBeInTheDocument()
  })
})
