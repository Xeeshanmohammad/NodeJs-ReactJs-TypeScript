import {Express, Request, Response} from "express"
import { createUserHandler } from "./Controllers/userControllers"
import validateRequest from "./Middleware/validateUser"
import createUserSchema from "./schema/userSchema"
export default function(app:Express){
  app.get('/healthCheck',(req:Request,res:Response)=>res.sendStatus(200))
  app.post('/api/user', validateRequest(createUserSchema),createUserHandler)
}
