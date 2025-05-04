"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

export function DatePicker({onChange}) {
  const [date, setDate] = React.useState(new Date())

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate) // Atualiza o estado local
    if (onChange) {
      onChange(selectedDate) // Notifica o componente pai sobre a data selecionada
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          locale={ptBR}
          initialFocus={date}
        />
      </PopoverContent>
    </Popover>
  )
}