import { z } from 'zod'

export const formSchema = z.object({
  coordenadores: z.array(
    z.object({
      representacao: z.enum(
        [
          'setor-1',
          'setor-2',
          'setor-3',
          'setor-4',
          'setor-5',
          'setor-6',
          'setor-7',
          'setor-8',
        ],
        {
          required_error: 'Selecione uma rede social.',
        },
      ),
      nome: z.string({ message: 'Campo obrigatório' }).min(3, {
        message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      }),
      telefone: z.string({ message: 'Campo obrigatório' }),
      // .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      //   message: 'O telefone deve estar no formato (99) 99999-9999.',
      // }),
    }),
  ),
})

export type FormSchemaType = z.infer<typeof formSchema>
