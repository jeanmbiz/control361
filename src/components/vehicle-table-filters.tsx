import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function VehicleTableFilters() {
  return (
    <form className="flex h-20 items-center justify-between bvehicle-b-2">
      <span className="text-xl font-semibold">Lista</span>
      <RadioGroup className="flex items-center gap-5" defaultValue="tracked">
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            id="tracked"
            value="tracked"
            className="cursor-pointer"
          />
          <Label htmlFor="tracked" className="cursor-pointer">
            Rastreados
          </Label>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            id="others"
            value="others"
            className="cursor-pointer"
          />
          <Label htmlFor="others" className="cursor-pointer">
            Outros
          </Label>
        </div>
      </RadioGroup>
      <div className="flex items-center gap-5">
        <Input
          placeholder="Buscar por placa ou frota"
          className="h-8 w-[320px]"
        />
        <Button
          className="bg-[var(--primary)] hover:bg-[var(--primary)] hover:opacity-90 text-white cursor-pointer px-15 font-bold"
          variant="secondary"
          size="lg"
          type="submit"
        >
          Novo
        </Button>
      </div>
    </form>
  )
}
