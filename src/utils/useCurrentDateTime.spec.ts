import { useCurrentDateTime } from '@/utils/useCurrentDateTime'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe('Use Current Date Time', () => {
  const mockDate = new Date(2025, 4, 10, 14, 30, 0) // 10 de maio de 2025, 14:30

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)

    const originalToLocaleDateString = Date.prototype.toLocaleDateString
    const originalToLocaleTimeString = Date.prototype.toLocaleTimeString

    Date.prototype.toLocaleDateString = function (locale?: string | string[]) {
      if (locale === 'pt-BR') {
        const date = new Date()
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
      }
      return originalToLocaleDateString.call(this, locale)
    }

    Date.prototype.toLocaleTimeString = function (
      locale?: string | string[],
      options?: Intl.DateTimeFormatOptions
    ): string {
      if (
        locale === 'pt-BR' &&
        options?.hour === '2-digit' &&
        options?.minute === '2-digit'
      ) {
        const date = new Date()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${hours}:${minutes}`
      }
      return originalToLocaleTimeString.call(this, locale, options)
    }
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  test('should return the correctly formatted initial date and time', () => {
    const { result } = renderHook(() => useCurrentDateTime(60000))

    expect(result.current).toBe('10/05/2025 - 14:30')
  })

  test('should update the date and time according to the given interval', () => {
    const updateInterval = 60000 // 1 minuto
    const { result } = renderHook(() => useCurrentDateTime(updateInterval))

    expect(result.current).toBe('10/05/2025 - 14:30')

    act(() => {
      vi.advanceTimersByTime(updateInterval)
    })

    expect(result.current).toBe('10/05/2025 - 14:31')
  })

  test('should use the provided interval for updates', () => {
    const setIntervalSpy = vi.spyOn(global, 'setInterval')
    const customInterval = 120000 // 2 minutos

    renderHook(() => useCurrentDateTime(customInterval))

    expect(setIntervalSpy).toHaveBeenCalledWith(
      expect.any(Function),
      customInterval
    )
  })

  test('should react to changes in the update interval', () => {
    const initialInterval = 60000
    const updatedInterval = 120000

    const { rerender } = renderHook(
      ({ interval }) => useCurrentDateTime(interval),
      {
        initialProps: { interval: initialInterval },
      }
    )

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const setIntervalSpy = vi.spyOn(global, 'setInterval')

    rerender({ interval: updatedInterval })

    expect(clearIntervalSpy).toHaveBeenCalled()

    expect(setIntervalSpy).toHaveBeenCalledWith(
      expect.any(Function),
      updatedInterval
    )
  })
})
