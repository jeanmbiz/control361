export const currentDateTime = `${new Date().toLocaleDateString('pt-BR')} - ${new Date().toLocaleTimeString(
  'pt-BR',
  {
    hour: '2-digit',
    minute: '2-digit',
  }
)}`
