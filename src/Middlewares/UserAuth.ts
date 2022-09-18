import { User } from "../Models/User";
import { Request, Response, NextFunction } from "express";

class DuplicateCheck {

   verifyUser = async (req:Request, res: Response, next:NextFunction) => {
    
    try {
        const{ email } = req.body
        //find one user with the email
           const emailCheck = await User.findOne({
               where: {
                   email: email
               }
           })
           if(emailCheck){
               res.send('Authentication failed')
           }
    
          next()   
    } catch (error) {
      console.log(error)  
    }
    
   }
}

export default new DuplicateCheck();