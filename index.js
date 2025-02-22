import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './router/index.js'
import errorMiddleware from './middleware/error-middleware.js'


dotenv.config();


const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.CLIENT_VERCEL_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use('/api', router)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8080


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
    } catch (error) {
        console.log(error)
    }
}

start()

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})