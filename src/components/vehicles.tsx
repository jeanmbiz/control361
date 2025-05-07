import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { VehiclesTableRow } from './vehicles-table-row'

export function Vehicles() {
  return (
    <>
      <div className="space-y-2.5">
        <div className="border rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Placa
                </TableHead>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Frota
                </TableHead>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Tipo
                </TableHead>
                <TableHead className="w-[140px] border-r-2 border-border px-4 py-2 text-center text-lg font-semibold">
                  Modelo
                </TableHead>
                <TableHead className="w-[140px] text-center text-lg font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 20 }).map((_, i) => {
                return <VehiclesTableRow key={i} />
              })}
            </TableBody>
          </Table>
        </div>
        <div>paginação / scroll infinito</div>
      </div>
    </>
  )
}
