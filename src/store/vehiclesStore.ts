import { create } from 'zustand'

export type VehicleState = {
  type: 'tracked' | 'others'
  setType: (type: 'tracked' | 'others') => void
}

export const useVehicleStore = create<VehicleState>(set => ({
  type: 'tracked',
  setType: type => set({ type }),
}))
