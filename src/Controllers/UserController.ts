import { User } from "../Models/User";
import { Request, Response } from "express";
import { uuid } from "uuidv4";

import nodemailer from 'nodemailer'
import bcrypt from "bcrypt";
import sendMail from "../Notifications/emailNotification";
import { Token } from "../Models/Token";

class UserController {

  addUser = async (req: Request, res: Response) => {
    try {
      //hash password
      const { password, email, name, id } = req.body;

      const hashed = await bcrypt.hash(password, 10);
      console.log(hashed);

      let userid = uuid();

      const newUser = await User.create({ ...req.body, password: hashed, id:userid });

      if (newUser) {
        const id = uuid();
        let userId = userid;
        let token = uuid();
        let setToken = await Token.create({ ...req.body, id, token, userId });

        console.log('token', setToken)
        if (setToken) {
            let Transporter =  nodemailer.createTransport({
                service: "gmail",
                auth : {
                    user:process.env.email,
                    pass:process.env.emailPassword 
                }    
            })
    
            let info = await Transporter.sendMail({
                from: process.env.email, // sender address
                to: email, // list of receivers
                subject: "Email Verification ✔", // Subject line
                text: "Oakland Estates Email Verification", // plain text body
                html: `<b>Hello ${name}?</b>
                        Click on this link to verify your account
                        <br></br>
                        http://localhost:7070/api/users/${token}/${userId}`,
                         // html body
              });
           
              console.log("Message sent: %s", info.messageId); 
        }
      } else {
        res.send("authentication failed");
      }

      res.send(newUser);
      console.log(newUser);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserController();
