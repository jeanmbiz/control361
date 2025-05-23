import { themeVars } from '@/components/theme/themeVars'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { env } from '@/env'
import { useVehiclesMapQuery } from '@/queries/useVehiclesMapQuery'
import { useVehicleStore } from '@/store/vehiclesStore'
import { useCurrentDateTime } from '@/utils/useCurrentDateTime'
import { Map as GoogleMap, useMap } from '@vis.gl/react-google-maps'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Spinner } from './spinner'
import { VehicleMarker } from './vehicle-marker'

const markerColors: Array<keyof typeof themeVars> = [
  'chart1',
  'chart2',
  'chart3',
  'chart5',
]

export function MapCard() {
  const { mapVehicles, isFetchingMap, isLoadingMap } = useVehiclesMapQuery()
  const mapRefetchInterval = useVehicleStore(state => state.mapRefetchInterval)
  const currentDateTime = useCurrentDateTime(mapRefetchInterval)

  const map = useMap()

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  )

  const handleVehicleClick = useCallback((id: string) => {
    setSelectedVehicleId((prevId: string | null) => (prevId === id ? null : id))
  }, [])

  const handleClose = useCallback(() => setSelectedVehicleId(null), [])

  const markerInstancesRef = useRef(new Map())

  useEffect(() => {
    if (!map || !mapVehicles?.content?.locationVehicles?.length) return

    const bounds = new window.google.maps.LatLngBounds()

    for (const vehicle of mapVehicles.content.locationVehicles) {
      bounds.extend({ lat: vehicle.lat, lng: vehicle.lng })
    }

    map.fitBounds(bounds)
  }, [map, mapVehicles])

  const registerMarkerRef = useCallback((id: string, instance: string) => {
    markerInstancesRef.current.set(id, instance)
  }, [])

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center">
          Mapa Rastreador
          {isFetchingMap && (
            <span
              style={{ color: themeVars.mutedForeground }}
              className="ml-2 text-xs flex items-center gap-1"
            >
              <Loader2 className="h-3 w-3 animate-spin" />
              Atualizando...
            </span>
          )}
        </CardTitle>
        <div style={{ color: themeVars.mutedForeground }} className="text-xs">
          {currentDateTime}
        </div>
      </CardHeader>
      <CardContent className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden relative">
        <div className="w-full h-full rounded-xl overflow-hidden">
          <GoogleMap
            mapId={env.VITE_GOOGLE_MAP_ID}
            defaultZoom={15}
            gestureHandling="greedy"
            reuseMaps
            disableDefaultUI
          >
            {mapVehicles?.content?.locationVehicles?.map((vehicle, index) => {
              const isInfoWindowOpen = selectedVehicleId === vehicle.id
              const colorKey = markerColors[index % markerColors.length]

              return (
                <VehicleMarker
                  data-testid="vehicle-marker"
                  key={vehicle.id}
                  vehicle={vehicle}
                  markerColor={colorKey}
                  onClick={() => handleVehicleClick(vehicle.id)}
                  isInfoWindowOpen={isInfoWindowOpen}
                  onClose={handleClose}
                  onMarkerRef={(ref: string) =>
                    registerMarkerRef(vehicle.id, ref)
                  }
                />
              )
            })}
          </GoogleMap>
        </div>
        {isLoadingMap && !mapVehicles && (
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-50"
            data-testid="spinner"
          >
            <Spinner />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
