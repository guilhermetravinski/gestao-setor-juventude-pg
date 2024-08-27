import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Evento } from '@/lib/definitions'

interface EventoTooltipData {
  colorClass: string
  content: string
}
interface TooltipTipoEventoProps {
  evento: Evento
}

export function TooltipTipoEvento({ evento }: TooltipTipoEventoProps) {
  function getEventoTooltipData(organizador: string): EventoTooltipData {
    if (organizador.includes('etor Juventude')) {
      return { colorClass: 'bg-setor ', content: 'Evento diocesano' }
    } else if (organizador.includes('Setor')) {
      return { colorClass: 'bg-rose-400', content: 'Evento setorial' }
    } else {
      return {
        colorClass: 'bg-yellow-400',
        content: 'Evento de grupo ou movimento',
      }
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`h-3 w-3 rounded-full ${
              getEventoTooltipData(evento.organizador).colorClass
            }`}
          ></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getEventoTooltipData(evento.organizador).content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
