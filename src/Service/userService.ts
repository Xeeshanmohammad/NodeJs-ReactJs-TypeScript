import { DocumentDefinition } from "mongoose";
import User, {UserDocument} from "../Models/userModels"

export async function createUser(input:DocumentDefinition<UserDocument>){
    try {
       return  await User.create(input)
    } catch (error) {
        throw new Error('Error' + error)
    }

}

function findUser(){

}