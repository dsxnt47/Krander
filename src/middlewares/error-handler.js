export function errorHandler(req,res){

    // res.headersSent verifica se os cabeçalhos da resposta foram enviados
    if(res.headersSent){
        // err guarda as informações do erro.
        return next(err)
    }

    // entity.parse.failed identifica erros de interpretação do JSON
    if (err.type==='entity.parse.failed'){
        return res.status(400).json({
            erro: 'Sintaxe de JSON inválida'
        })
    }
    // entity.parse.failed identifica requisições onde o corpo ultapassou o limite configurado
    if (err.type==='entity.too.large'){
        return res.status(413).json({
            erro: "Corpo da requisição muito grande"
        })
    }

    console.error('Erro inesperado', err)

    return res.status(500).json({erro: 'Erro interno do servidor'})
}