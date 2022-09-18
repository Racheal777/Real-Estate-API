import { User } from "../Models/User";
import { Request, Response } from "express";



     export const addUser =async (req:Request, res:Response) => {
        
        const newUser = await User.create({...req.body})
        res.send(newUser)
        console.log(newUser)
    }
