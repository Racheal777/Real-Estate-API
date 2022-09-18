
import { Router } from "express";
import express from 'express'
import userController from '../Controllers/UserController'

import DuplicateCheck from '../Middlewares/UserAuth'


export const router:Router = express.Router()

router.post('/users',DuplicateCheck.verifyUser, userController.addUser )




