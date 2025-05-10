import { render } from '@testing-library/react'
import { VehiclesTableRow } from './vehicle-table-row'

const mockVehicle = {
  id: '1',
  plate: 'JAP6D30',
  fleet: '111' as string | null,
  type: 'implement' as 'implement' | 'vehicle',
  model: '123',
  nameOwner: 'John Doe',
  status: 'active',
  createdAt: '2025-05-07T11:46:42.816Z',
}

describe('Vehicle Table Row', () => {
  const renderInTable = (vehicle = mockVehicle) =>
    render(
      <table>
        <tbody>
          <VehiclesTableRow vehicle={vehicle} />
        </tbody>
      </table>
    )

  it('should render the vehicle data correctly', () => {
    const wrapper = renderInTable()

    expect(wrapper.getByText('JAP6D30')).toBeInTheDocument()
    expect(wrapper.getByText('111')).toBeInTheDocument()
    expect(wrapper.getByText('Implemento')).toBeInTheDocument()
    expect(wrapper.getByText('123')).toBeInTheDocument()
    expect(wrapper.getByText('Ativo')).toBeInTheDocument()
  })

  it('should be "-" when fleet is null', () => {
    const wrapper = renderInTable({ ...mockVehicle, fleet: null })

    expect(wrapper.getByText('-')).toBeInTheDocument()
  })

  it('should translate type correctly', () => {
    const wrapper = renderInTable({ ...mockVehicle, type: 'vehicle' })

    expect(wrapper.getByText('Veículo')).toBeInTheDocument()
  })

  it('should translate status correctly', () => {
    const wrapper = renderInTable({ ...mockVehicle, status: 'active' })

    expect(wrapper.getByText('Ativo')).toBeInTheDocument()
  })
})
