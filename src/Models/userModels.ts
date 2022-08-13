import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface UserDocument extends mongoose.Document{
   name:string,
   email:string,
   password:string,
   createdAt:Date,
   updatedAt:Date,
   comparePassword(candidatePassword:string):Promise<Boolean>
}

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.methods.comparePassword = async function(candidatePassword:string){
const user = this as UserDocument;
return bcrypt.compare(candidatePassword, user.password).catch((e)=>console.log(e))
}

userSchema.pre('save', async function(){
    const user = this as UserDocument;
    if(!user.isModified('password')) return;
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"))
    const hash = await bcrypt.hashSync(user.password, salt)
    user.password = hash;
    return ;

})

const user = mongoose.model<UserDocument>('User', userSchema)

export default user
