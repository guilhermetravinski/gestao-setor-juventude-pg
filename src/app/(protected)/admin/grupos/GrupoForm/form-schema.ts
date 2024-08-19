import { z } from 'zod'

export const formSchema = z.object({
  nome: z.string({ message: 'Campo obrigatório' }).min(3, {
    message: 'O nome do grupo deve ter pelo menos 3 caracteres.',
  }),
  avatarUrl: z.string().optional(),
  jovensAtivos: z.enum(
    ['Até 20 jovens', 'Entre 20 e 50 jovens', 'Mais de 50 jovens'],
    {
      required_error: 'Selecione o número de jovens ativos.',
    },
  ),
  reunioes: z.string().optional(),
  coordenadores: z
    .array(
      z.object({
        id: z.string().optional(),
        nome: z.string({ message: 'Campo obrigatório' }).min(3, {
          message: 'O nome do coordenador deve ter pelo menos 3 caracteres.',
        }),
        telefone: z
          .string({ message: 'Campo obrigatório' })
          .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
            message: 'O telefone deve estar no formato (99) 99999-9999.',
          }),
      }),
    )
    .optional(),
  redesSociais: z
    .array(
      z.object({
        id: z.string().optional(),
        rede: z.enum(['Facebook', 'Instagram'], {
          required_error: 'Selecione uma rede social.',
        }),
        nomeUsuario: z.string({ message: 'Campo obrigatório' }).min(3, {
          message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
        }),
      }),
    )
    .optional(),
  setor: z.string({ message: 'Campo obrigatório' }).min(1, {
    message: 'Selecione um setor.',
  }),
  paroquia: z.string({ message: 'Campo obrigatório' }).min(1, {
    message: 'Selecione uma paróquia.',
  }),
  comunidade: z.string({ message: 'Campo obrigatório' }).min(3, {
    message: 'A comunidade deve ter pelo menos 3 caracteres.',
  }),
  anoFundacao: z.string().optional(),
  biografia: z.string().optional(),
  observacoes: z.string().optional(),
})

export type FormSchemaType = z.infer<typeof formSchema>
