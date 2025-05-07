import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MapCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Mapa Rastreador
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">MAPA DO GOOGLE</CardContent>
    </Card>
  )
}
