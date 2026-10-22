import 'dotenv/config' 

function lerPorta(valor){
    const porta = Number(valor)

    if(!Number.isInteger(porta) || porta<1 || porta>65535){
        throw new Error('A variável PORT é inválida')
    }
    return porta
}

function lerObrigatoria(nome){
    const valor = process.env[nome]

    if(!valor || valor.trim()===''){
        throw new Error(`A variável ${nome} é obrigatória`)
    }

    return valor
}


const nodeEnv = process.env.NODE_ENV ?? 'development'
const host = process.env.HOST ?? '127.0.0.1'
const port = lerPorta(process.env.PORT ?? '3000')

if(!['development', 'test', 'production'].includes(nodeEnv)){
    throw new Error('A variável NODE_ENV é inválida')
}


if(host.trim()===''){
    throw new Error('A variável HOST não pode estar vazia')
}

const dbHost = lerObrigatoria('DB_HOST');
const dbPort = lerPorta(process.env.DB_PORT ?? '5432', 'DB_PORT');
const dbUser = lerObrigatoria('DB_USER');
const dbName = lerObrigatoria('DB_NAME');
const dbPassword = lerObrigatoria('DB_PASSWORD');



// Object.freeze impede alterações nas propriedades NodeEnv, host e port
export const env = Object.freeze({
    nodeEnv,
    host,
    port,
    database: Object.freeze({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        name: dbName,
        password: dbPassword,
    })
})