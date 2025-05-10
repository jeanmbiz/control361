import { Loader2 } from 'lucide-react'

export const Spinner = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="p-4 bg-background/95 rounded-full shadow-lg">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">Carregando...</p>
    </div>
  )
}
