import express from 'express'
import { Create, UpdateNotes ,Delete ,GetNotes } from '../controllers/Notes.js'
import { VerfictonToken } from '../middlewares/Verfictiontoken.js'

const NotesRoutes=express.Router()

NotesRoutes.post('/createnote', VerfictonToken , Create)
NotesRoutes.put('/updateNotes/:id' , VerfictonToken ,UpdateNotes)
NotesRoutes.delete('/deleteNotes/:id', VerfictonToken,Delete)
NotesRoutes.get('/Getnotes',VerfictonToken,GetNotes)

export default NotesRoutes

