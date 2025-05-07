import { TableCell, TableRow } from '@/components/ui/table'

export function VehiclesTableRow() {
  return (
    <TableRow>
      <TableCell className="font-mono font-medium text-center border-r-2 border-border px-4 py-2">
        EAD 7328
      </TableCell>
      <TableCell className="font-medium border-r-2 border-border px-4 py-2 text-center">
        000001
      </TableCell>
      <TableCell className="text-muted-foreground border-r-2 border-border px-4 py-2 text-center">
        Implemento
      </TableCell>
      <TableCell className="text-muted-foreground border-r-2 border-border px-4 py-2 text-center">
        F MAX Select
      </TableCell>
      <TableCell className="font-medium text-center">Em manutenção</TableCell>
    </TableRow>
  )
}
