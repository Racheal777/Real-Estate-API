import multer from 'multer';
import {Property} from '../Models/Property'
import { NextFunction, Request, Response } from "express";
import { Op } from 'sequelize';

 class PropertyController {

    //add a property
    addProperty = async (req:Request, res: Response) => {

        //uploading a file
        try {    
            //const amenities:[] = req.body
        
        const images= req.files?.map(item => item.originalname)
        //const amenity = amenities?.map()
        const newProperty = await Property.create({...req.body, images})
        res.json( {'property': newProperty})
        
        console.log(newProperty.toJSON())
    

        } catch (error) {
           console.log(error) 
        }
        
    }

    //fetch all property
    getAllProperties = async (req:Request, res:Response) => {
        try {

        const properties = await Property.findAll()
        res.json({properties}.properties)

        } catch (error) {
          console.log(error)  
        }
        
    }


    //get one property
    getOneProperty = async (req:Request, res:Response) => {

        try {

            const propertyId = req.params.id
            const property = await Property.findOne({where: {id: propertyId}})
            res.json({'property': property}.property) 

        } catch (error) {
           console.log(error) 
        }
        
    }


    //search a property
    searchProperty = async (req:Request, res:Response) =>{

        try {
           
            //get the values in the params
        const {name, location, rent} = req.params

        //find all properties
        const property = await Property.findAll({
            where: {
                
                [Op.or] : [
                    {name: {[Op.iLike]: name}},
                    {location: {[Op.iLike]: location}},
                    //{location: location},
                     {rent: rent}
                ]
                
            }   
        })

        res.json({'properties': property}.properties)

        } catch (error) {
            console.log(error)
        }
        
    }


    //show current property
    currentProperties = async (req:Request, res:Response) => {

        try {
            const property = Property.findAll()
            const reverse = (await property).reverse()
            const first3 = reverse.slice(0, 3)
            res.send(first3)
            console.log(first3.length)
            
            
        } catch (error) {
          console.log(error)  
        }
        
    }



}


export default new PropertyController()