import { z } from 'zod'

export const ataSchema = z.object({
  grupoId: z.string(),
  movimentoPastoralId: z.string(),
  data: z.string(),
  descricao: z.string(),
})

export const ataUpdateSchema = z.object({
  data: z.string().optional(),
  descricao: z.string().optional(),
})

export type AtaType = z.infer<typeof ataSchema>
export type AtaUpdateType = z.infer<typeof ataUpdateSchema>
