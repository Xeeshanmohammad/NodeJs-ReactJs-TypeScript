import mongoose from "mongoose"
import config from "config"
import log from "../logger"

const MongoDB = config.get('database') as string

const connect = ()=>{

    mongoose.connect(MongoDB,{
    
    }).then(()=>log.info('Database Connected'))
    .catch((error)=>log.error('Database connection is failed' + error))
}

export default connect
