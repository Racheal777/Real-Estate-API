
import { Router } from "express";
import express from 'express'
import {addUser} from '../Controllers/UserController'


export const router:Router = express.Router()

router.post('/users',addUser )




