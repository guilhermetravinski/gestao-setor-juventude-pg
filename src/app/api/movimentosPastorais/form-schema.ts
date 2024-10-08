import { z } from 'zod'

export const formSchema = z.object({
  nome: z.string({ message: 'Campo obrigatório' }).min(1, {
    message: 'O nome do grupo deve ter pelo menos 3 caracter.',
  }),
  jovensAtivos: z.enum(
    ['Até 20 jovens', 'Entre 20 e 50 jovens', 'Mais de 50 jovens'],
    {
      required_error: 'Selecione o número de jovens ativos.',
    },
  ),
  avatarUrl: z.string().optional().nullable(),
  tipo: z.enum(['Pastoral', 'Movimento'], {
    required_error: 'Selecione o tipo.',
  }),
  carisma: z.string().optional(),
  atividades: z.string().optional(),
  atas: z
    .array(
      z.object({
        id: z.string(),
        data: z.string(),
        descricao: z.string(),
      }),
    )
    .optional(),
  coordenadores: z
    .array(
      z.object({
        id: z.string().optional(),
        nome: z.string({ message: 'Campo obrigatório' }).min(3, {
          message: 'O nome do coordenador deve ter pelo menos 3 caracteres.',
        }),
        telefone: z
          .string({ message: 'Campo obrigatório' })
          .regex(/^\(\d{2}\) \d{1} \d{4}-\d{4}$/, {
            message: 'O telefone deve estar no formato (99) 9 9999-9999.',
          }),
        email: z
          .string({ message: 'Campo obrigatório' })
          .email({ message: 'E-mail inválido' }),
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
  localAtuacao: z.string({ message: 'Campo obrigatório' }).min(1, {
    message: 'Selecione um setor.',
  }),
  anoFundacao: z.string().optional(),
  biografia: z.string().optional(),
  observacoes: z.string().optional(),
})

export type FormSchemaType = z.infer<typeof formSchema>
