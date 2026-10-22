export function notFoundHandler(req,res){
    res.status(400).json({erro: 'Rota não encontrada'})
}