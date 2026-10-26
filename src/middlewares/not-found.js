export function notFoundHandler(req,res){
    res.status(404).json({erro: 'Rota não encontrada'})
}

