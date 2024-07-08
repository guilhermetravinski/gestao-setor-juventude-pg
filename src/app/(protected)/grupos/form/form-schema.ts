import { z } from 'zod'

export const formSchema = z.object({
  nome: z.string().min(2, {
    message: 'O nome do grupo deve ter pelo menos 2 caracteres.',
  }),
  jovesAtivos: z.enum(
    ['Até 20 jovens', 'Entre 20 e 50 jovens', 'Mais de 50 jovens'],
    {
      required_error: 'Selecione o número de jovens ativos.',
    },
  ),
  reunioes: z.string().min(2, {
    message: 'As informações sobre reuniões devem ter pelo menos 2 caracteres.',
  }),
  coordenacao: z
    .array(
      z.object({
        nome: z.string().min(2, {
          message: 'O nome do coordenador deve ter pelo menos 2 caracteres.',
        }),
        telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
          message: 'O telefone deve estar no formato (99) 99999-9999.',
        }),
      }),
    )
    .min(1, {
      message: 'Adicione pelo menos um coordenador.',
    }),
  redesSociais: z
    .array(
      z.object({
        rede: z.enum(['Facebook', 'Instagram'], {
          required_error: 'Selecione uma rede social.',
        }),
        nomeUsuario: z.string().min(2, {
          message: 'O nome de usuário deve ter pelo menos 2 caracteres.',
        }),
      }),
    )
    .max(2, {
      message: 'Você pode adicionar no máximo uma conta de cada rede social.',
    }),
  setor: z.string().min(1, {
    message: 'Selecione um setor.',
  }),
  paroquia: z.string().min(1, {
    message: 'Selecione uma paróquia.',
  }),
  comunidade: z.string().min(2, {
    message: 'A comunidade deve ter pelo menos 2 caracteres.',
  }),
  dtFundacao: z.date({
    required_error: 'A data de fundação é obrigatória.',
  }),
  biografia: z.string().min(2, {
    message: 'A biografia deve ter pelo menos 2 caracteres.',
  }),
  observacoes: z.string().min(2, {
    message: 'As observações devem ter pelo menos 2 caracteres.',
  }),
})

export type FormSchemaType = z.infer<typeof formSchema>
