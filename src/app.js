import express from 'express'
import { notFoundHandler } from './middlewares/not-found.js'
import { errorHandler } from './middlewares/error-handler.js'

const app = express()

app.use(express.json({limit: '100kb'}))

app.get('/health', (req,res)=>{
    res.status(200).json({status: 'ok', application:'Krander',})
})

app.use(notFoundHandler)
app.use(errorHandler)


export default app;