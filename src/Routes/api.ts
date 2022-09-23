
import { Router } from "express";

import userController from '../Controllers/UserController'

const {Login, Signup, VerifyUser} = userController
import multer from "multer";
import DuplicateCheck from '../Middlewares/UserAuth'
import PropertyController  from '../Controllers/PropertyController'

const {addProperty, getOneProperty, getAllProperties, searchProperty} = PropertyController


const router = Router()

//signup
router.post('/users',DuplicateCheck.verifyUser, Signup )

//verify email route
router.get('/verify-email/:id/:token', VerifyUser)


//login
router.post('/login', Login)


//upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      
      cb(null,  file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  //upload one
  // const store = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'src/uploads/avatar')
  //   },
  //   filename: function (req, file, cb) {
      
  //     cb(null, file.fieldname + '-' + file.originalname)
  //   }
  // })
  
  //const OneUpload = multer({ storage: store })

//Property routes
router.post('/property/add', upload.array('images'), addProperty )

//get all properties
router.get('/property/all-properties', getAllProperties )

//get one property
router.get('/property/one-property/:id', getOneProperty)

//search a property
router.get('/property/search/:location/:name/:rent', searchProperty)

export default router




