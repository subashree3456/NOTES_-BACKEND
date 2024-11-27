import express from 'express'

import { Register , Login ,  Logout} from '../controllers/Auth.js'

const AutRoutes=express.Router()

AutRoutes.post('/register',Register)
AutRoutes.post('/login',Login)
AutRoutes.post('/logout',Logout)

export default AutRoutes