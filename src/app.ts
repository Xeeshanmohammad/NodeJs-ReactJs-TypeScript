import express from "express";
import config from "config";
import log from "./logger";
 import connectDB from "./database/connect";
 import routes from "./router";


const port = config.get('port') as number
const host = config.get('host') as string

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port,host,()=>{
    log.info(` Server is listening at : http://${host}:${port}`);
    connectDB()
    routes(app)
})