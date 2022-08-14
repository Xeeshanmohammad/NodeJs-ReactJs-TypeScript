import { DocumentDefinition, FilterQuery  } from "mongoose";
import User, {UserDocument} from "../Models/userModels"
import {omit} from "lodash"


export async function createUser(
    input:DocumentDefinition<Omit<UserDocument,"createdAt" | "updatedAt" | "comparePassword">>
    ){
    try {
       return  await User.create(input)
    } catch (error) {
        throw new Error('Error' + error)
    }

}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
  }

export async function validatePassword({email, password}:{email:UserDocument["email"],password:string}){
       const user =   await User.findOne({email})
       if(!user){
           return false
       }
       const isValid = await user.comparePassword(password)
       if(!isValid){
        return false;
       }
     return  omit(user.toJSON(),"password")

}