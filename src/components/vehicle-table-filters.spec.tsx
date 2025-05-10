import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VehicleTableFilters } from './vehicle-table-filters'

const mockSetType = vi.fn()
let mockType = 'tracked'

vi.mock('@/store/vehiclesStore', () => ({
  useVehicleStore: vi.fn(selector => {
    const store = {
      type: mockType,
      setType: (value: string) => {
        mockType = value
        mockSetType(value)
      },
    }

    if (typeof selector === 'function') {
      return selector(store)
    }

    return store
  }),
}))

describe('Vehicle Table Filters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSetType.mockClear()
    mockType = 'tracked'
  })

  test('should be render the radio buttons with the correctly values', () => {
    const wrapper = render(<VehicleTableFilters />)

    expect(wrapper.getByLabelText('Rastreados')).toBeInTheDocument()
    expect(wrapper.getByLabelText('Outros')).toBeInTheDocument()

    expect(wrapper.getByLabelText('Rastreados')).toBeChecked()
    expect(wrapper.getByLabelText('Outros')).not.toBeChecked()
  })

  test('should call setType when select "Outros"', async () => {
    const user = userEvent.setup()
    const wrapper = render(<VehicleTableFilters />)

    expect(wrapper.getByLabelText('Rastreados')).toBeChecked()
    expect(wrapper.getByLabelText('Outros')).not.toBeChecked()

    await user.click(wrapper.getByLabelText('Outros'))

    expect(mockSetType).toHaveBeenCalledWith('others')

    wrapper.rerender(<VehicleTableFilters />)

    expect(wrapper.getByLabelText('Rastreados')).not.toBeChecked()
    expect(wrapper.getByLabelText('Outros')).toBeChecked()
  })
})
