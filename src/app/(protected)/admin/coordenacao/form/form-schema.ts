import { z } from 'zod'

export const formSchema = z.object({
  coordenadores: z.array(
    z.object({
      paroquia: z.string({ message: 'Campo obrigatório' }).min(3, {
        message: 'O campo deve ter pelo menos 3 caracteres.',
      }),
      avatarUrl: z.string().nullable().optional(),
      representacao: z.string({ message: 'Campo obrigatório' }).min(3, {
        message: 'O campo deve ter pelo menos 3 caracteres.',
      }),
      nome: z.string({ message: 'Campo obrigatório' }).min(3, {
        message: 'O nome deve ter pelo menos 3 caracteres.',
      }),
      telefone: z
        .string({ message: 'Campo obrigatório' })
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
          message: 'O telefone deve estar no formato (99) 99999-9999.',
        }),
      email: z
        .string({ message: 'Campo obrigatório' })
        .email({ message: 'E-mail inválido' }),
    }),
  ),
})

export type FormSchemaType = z.infer<typeof formSchema>
