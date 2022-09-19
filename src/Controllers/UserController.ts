import { User } from "../Models/User";
import { NextFunction, Request, Response } from "express";
import { uuid } from "uuidv4";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import sendMail from "../Notifications/emailNotification";
import { Token } from "../Models/Token";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class UserController {
  Signup = async (req: Request, res: Response) => {
    try {
      //hash password
      const { password, email, name, id } = req.body;

      const hashed = await bcrypt.hash(password, 10);
      console.log(hashed);

      let userid = uuid();

      const newUser = await User.create({
        ...req.body,
        password: hashed,
        id: userid,
      });

      if (newUser) {
        const id = uuid();
        let userId = userid;
        let token = uuid();
        let setToken = await Token.create({ ...req.body, id, token, userId });

        console.log("token", setToken);
        if (setToken) {
          let Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.email,
              pass: process.env.emailPassword,
            },
          });

          let info = await Transporter.sendMail({
            from: process.env.email, // sender address
            to: email, // list of receivers
            subject: "Email Verification ✔", // Subject line
            text: "Oakland Estates Email Verification", // plain text body
            html: `<b>Hello ${name}?</b>
                        Click on this link to verify your account
                  
                        http://localhost:7070/api/verify-email/${userId}/${token}
                        `,

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

  //VERIFY A USER
  VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
    //GET USER WITH A PARTICULAR TOKEN
    const userId = req.params.id;
    const onetoken = req.params.token;

    const userToken = await Token.findOne({
      where: {
        token: onetoken,
        userId,
      },
    });

    console.log("userToken", userToken);

    //if token is found, get the user  associated with that token
    if (userToken) {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });

      //if user is found, update the isverified to true
      if (user) {
        const verify = await User.update(
          { isVerified: true },
          {
            where: {
              id: userId,
            },
          }
        );
        return res.send(verify);
        //console.log("verify", verify);
      } else {
        res.send("no user found");
      }
    } else {
      res.send("Token not found");
    }
  };

  //login a user
  Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //const {isVerified} =  User

    //find the user with the email provided
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    //const {isVerified, } = existingUser

    //if user exist , compare password
    if (existingUser) {
      const passwordIsSame = await bcrypt.compare(
        password,
        existingUser.password
      );

      console.log("password is same", passwordIsSame);

      //if password matches, check if they are verified
      if (passwordIsSame) {
        const verified = existingUser.isVerified;

        console.log("verified", verified);

        if (verified) {
          //generate a jwt token and use it to set a cookie
          const Secret = process.env.SecretKey;
          const jwtToken = Jwt.sign({ id: existingUser.id }, Secret, {
            expiresIn: 1 * 24 * 60 * 1000,
          });
          console.log("jwt token", jwtToken);

          res.cookie("jwt", jwtToken, {
            maxAge: 1 * 24 * 60 * 60,
            httpOnly: true,
          });
          return res.json({ user: existingUser, cookie: jwtToken });
        } else {
          return res.send("user email not verified");
        }
      } else {
        return res.send("Authentication failed password incorrect");
      }
    } else {
      return res.send("Authentication failed");
    }
  };
}

export default new UserController();
