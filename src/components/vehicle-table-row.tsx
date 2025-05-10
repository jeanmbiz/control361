import type { Vehicle } from '@/api/get-vehicles'
import { TableCell, TableRow } from '@/components/ui/table'

interface VehiclesTableProps {
  vehicle: Vehicle
}

export function VehiclesTableRow({ vehicle }: VehiclesTableProps) {
  const typeText = vehicle.type === 'implement' ? 'Implemento' : 'Veículo'
  const statusText = vehicle.status === 'active' ? 'Ativo' : 'Inativo'

  return (
    <TableRow>
      <TableCell className="font-mono font-medium text-center border-r-2 border-border px-4 py-2">
        {vehicle.plate}
      </TableCell>
      <TableCell className="font-medium border-r-2 border-border px-4 py-2 text-center">
        {vehicle.fleet || '-'}
      </TableCell>
      <TableCell className="text-muted-foreground border-r-2 border-border px-4 py-2 text-center">
        {typeText}
      </TableCell>
      <TableCell className="text-muted-foreground border-r-2 border-border px-4 py-2 text-center">
        {vehicle.model}
      </TableCell>
      <TableCell className="font-medium text-center">{statusText}</TableCell>
    </TableRow>
  )
}
