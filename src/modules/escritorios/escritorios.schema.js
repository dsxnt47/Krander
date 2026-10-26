import { z } from 'zod';

export const schemaCriarEscritorio = z.object({
    nome: z.string({error: "O nome do escritório deve ser um texto."}).trim().min(1, 'O nome do escritório é obrigatório').max(150, 'O nome deve ter no máximo 150 caracteres')
})