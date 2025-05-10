import type { LocationVehicle } from '@/api/get-vehicles'
import { themeVars } from '@/components/theme/themeVars'
import { useVehicleStore } from '@/store/vehiclesStore'
import { useCurrentDateTime } from '@/utils/useCurrentDateTime'
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { Truck } from 'lucide-react'
import { useEffect } from 'react'

interface VehiclesMarkerProps {
  vehicle: LocationVehicle
  onClick: () => void
  isInfoWindowOpen: boolean
  onClose: () => void
  onMarkerRef: any
}

export function VehicleMarker({
  vehicle,
  onClick,
  isInfoWindowOpen,
  onClose,
  onMarkerRef,
}: VehiclesMarkerProps) {
  const mapRefetchInterval = useVehicleStore(state => state.mapRefetchInterval)
  const currentDateTime = useCurrentDateTime(mapRefetchInterval)
  const [markerRef, markerInstance] = useAdvancedMarkerRef()

  useEffect(() => {
    if (markerInstance) {
      onMarkerRef(markerInstance)
    }
  }, [markerInstance, onMarkerRef])

  return (
    <AdvancedMarker
      ref={markerRef}
      onClick={onClick}
      position={{ lat: vehicle.lat, lng: vehicle.lng }}
      anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM_CENTER}
    >
      <div className="relative">
        <div
          className="w-14 h-14 border-4 rounded-full flex items-center justify-center shadow-md"
          style={{
            backgroundColor: themeVars.chart3,
            borderColor: themeVars.chart3,
          }}
        >
          <div
            className="w-12 h-12 border-2 rounded-full flex items-center justify-center shadow-md"
            style={{
              backgroundColor: themeVars.chart3,
              borderColor: themeVars.white,
            }}
          >
            <Truck size={30} className="text-white" />
          </div>
        </div>
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[12px]"
          style={{
            borderTopColor: themeVars.chart3,
          }}
        />
      </div>

      {isInfoWindowOpen && markerInstance && (
        <InfoWindow
          headerDisabled
          disableAutoPan
          anchor={markerInstance}
          onClose={onClose}
        >
          <div
            className=" p-4 rounded-xl shadow-xl min-w-[220px] space-y-1 text-sm"
            style={{
              backgroundColor: themeVars.background,
              color: themeVars.mutedForeground,
            }}
          >
            <div className="text-base font-bold leading-tight">
              Placa {vehicle.plate}
            </div>
            <div className="text-sm" style={{ color: themeVars.foreground }}>
              Frota {vehicle.fleet}
            </div>
            <div className="text-sm" style={{ color: themeVars.foreground }}>
              {currentDateTime}
            </div>
            <a
              href={`https://www.google.com/maps?q=${vehicle.lat},${vehicle.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline"
              style={{ color: themeVars.primary }}
            >
              <div
                className="pt-1 text-xs"
                style={{ color: themeVars.mutedForeground }}
              >
                {vehicle.lat}, {vehicle.lng}
              </div>
            </a>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  )
}
