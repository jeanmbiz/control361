import { create } from 'zustand'

export type VehicleState = {
  type: 'tracked' | 'others'
  mapRefetchInterval: number
  mapStaleTime: number
  setType: (type: 'tracked' | 'others') => void
}

export const useVehicleStore = create<VehicleState>(set => ({
  type: 'tracked',
  mapRefetchInterval: 120000, // 2 minutos
  mapStaleTime: 110000, // 1:50 minuto
  setType: type => set({ type }),
}))
