import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()



class sendMail {
    
     verifyEmail = async ({})=> {

        try {
            let Transporter =  nodemailer.createTransport({
                service: "gmail",
                auth : {
                    user:process.env.email,
                    pass:process.env.emailPassword 
                }    
            })
    
            Transporter.sendMail({from:process.env.email})  
        } catch (error) {
          console.log(error)  
        }
        
    }
}


export default new sendMail();