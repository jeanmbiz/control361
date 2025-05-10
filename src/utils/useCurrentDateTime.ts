import { useEffect, useState } from 'react'

export function useCurrentDateTime(updateInterval:number) {
  const [dateTime, setDateTime] = useState(() => {
    return {
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime({
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      })
    }, updateInterval)

    return () => clearInterval(intervalId)
  }, [updateInterval])

  return `${dateTime.date} - ${dateTime.time}`
}
