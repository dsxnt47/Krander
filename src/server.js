import app from './app.js'
import { env } from './config/env.js'


const server = app.listen(env.port, env.host,()=>{
    console.log(`Krander disponível em http://${env.host}:${env.port}`)
})


function encerrarServiço(){
    server.close((erro)=>{
        if(erro){
            console.log("Erro ao conectar o servidor", erro)
            process.exitCode = 1
            return
        }

        console.log("Servidor encerrado com segurança")
    })
}

process.on('SIGINT', encerrarServiço)
process.on('SIGTERM', encerrarServiço)

