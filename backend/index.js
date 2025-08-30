import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/db.js'
import cookieParser from 'cookie-parser';
import authRouter from './Routes/AuthRouter.js';
import notesRouter from './Routes/NotesRouter.js';
const app=express()
dotenv.config();

const PORT = process.env.PORT || 8080

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true

}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter);
app.use('/api/notes',notesRouter);

app.get('/',(req,res)=>{
    res.send('Hello ')
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})