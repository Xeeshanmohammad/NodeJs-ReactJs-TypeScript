import express from "express";
import config from "config";
import log from "./logger";
 import connectDB from "./database/connect";
 import routes from "./router";
 import { deserializeUser } from "./Middleware";


const port = config.get('port') as number
const host = config.get('host') as string

const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny'))
app.use(deserializeUser)

app.listen(port,host,()=>{
    log.info(` Server is listening at : http://${host}:${port}`);
    connectDB()
    routes(app)
})