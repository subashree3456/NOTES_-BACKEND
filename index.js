import express from 'express'
import dotenv from 'dotenv'
import AutRoutes from './routes/Auth.js'
import DbCon from './utils/db.js'
import NotesRoutes from './routes/Notes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

DbCon()

const PORT=process.env.PORT
const app=express()

app.use(cors({
    credentials: true,
    origin: 'https://luxury-crostata-994474.netlify.app/'  // Replace with your frontend URL
}));


app.use(express.json())
app.use(cookieParser())

app.use('/auth',AutRoutes);
app.use('/notes',NotesRoutes)

app.get('/',(req,res)=>{
    res.send('hello from backend')
})


app.listen(PORT,()=>{
    console.log(`App is ruuning on Port ${PORT}`)
})





// Narasimha30

//  origin: 'http://localhost:5173'