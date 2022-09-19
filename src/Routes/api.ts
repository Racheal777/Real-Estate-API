
import { Router } from "express";
import express from 'express'
import userController from '../Controllers/UserController'

import DuplicateCheck from '../Middlewares/UserAuth'


const router = Router()

router.post('/users',DuplicateCheck.verifyUser, userController.Signup )

//verify email route


router.get('/verify-email/:id/:token', userController.VerifyUser)


//login
router.post('/login', userController.Login)

export default router



