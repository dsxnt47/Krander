import { Router } from 'express';

import { schemaCriarEscritorio } from './escritorios.schema.js';
import { validate } from 'zod';

import { listarEscritorios, criarEscritorios } from './escritorios.repository.js';

const router = Router();

router.post('/', async (req, res, next)=>{
    const validacao = schemaCriarEscritorio.safeParse(req.body)

    if(!validacao.success){
        return res.status(400).json({
            erro: 'Dados inválidos.', detalhes: validacao.error.issues.map((item)=>({campo: item.path.join('.'), mensagem: item.message}))

        })
    }

    try {
    const escritorio = await criarEscritorios(validacao.data.nome)

    return res.status(201).json({
        mensagem: 'Escritório cadastrado com sucesso',
        escritorio 
    })
    } catch(erro){
        return next(erro)
    }
})

router.get('/', async (req, res, next)=>{
    try{
        const escritorios = await listarEscritorios();

        return res.status(200).json({escritorios,})
    }  catch(erro){
        return next(erro)
    }
})

export default router;