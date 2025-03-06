import express from 'express'
import productRouter from './routes/productRoute.js'
import dotenv from 'dotenv'

dotenv.config({path: "./config.env"})



const app = express()
app.use(express.json())


app.use('/product',productRouter)


export default app