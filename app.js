import express from 'express'
import productRouter from './routes/productRoute.js'
import dotenv from 'dotenv'
import swaggerUI from "swagger-ui-express"
import specs from './middlewares/swagger.js'

dotenv.config({ path: "./config.env" })



const app = express()
app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use('/product', productRouter)

export default app