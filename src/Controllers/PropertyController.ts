import multer from 'multer';
import {Property} from '../Models/Property'
import { NextFunction, Request, Response } from "express";

 class PropertyController {
    addProperty = async (req:Request, res: Response) => {

        //uploading a file
        try {
           
            //const image  = req.file?.originalname
        //const { images } = req.body
         //let propertyImages = req.file?.originalname
         const images= req.files?.map(item => item.originalname)
         
         
       
        const newProperty = await Property.create({...req.body, images})
        res.json( {'property': newProperty})
        console.log({...req.body})
        console.log(req.files);
        
        console.log(newProperty.toJSON())

        } catch (error) {
           console.log(error) 
        }
        

    }
}


export default new PropertyController()