import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
import bodyParser from 'body-parser'
import router from './routes/index.routes.js'
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/v1", router)
export default app