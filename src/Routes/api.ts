
import { Router } from "express";
import express from 'express'
import userController from '../Controllers/UserController'
import multer from "multer";
import DuplicateCheck from '../Middlewares/UserAuth'
import PropertyController  from '../Controllers/PropertyController'


const router = Router()

router.post('/users',DuplicateCheck.verifyUser, userController.Signup )

//verify email route


router.get('/verify-email/:id/:token', userController.VerifyUser)


//login
router.post('/login', userController.Login)


//upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

//Property routes
router.post('/property/add', upload.array('images'), PropertyController.addProperty )

export default router




