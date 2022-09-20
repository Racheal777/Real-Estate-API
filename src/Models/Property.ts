import { DataTypes, Model } from "sequelize"
import db from '../Config/db.config'


interface PropertyAttribute {
name: string
location:string
amenities: string,
description: string
images: string
createdAt: Date
updatedAt: Date
}

export class Property extends Model<PropertyAttribute>{}

Property.init({
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    amenities: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },


    images: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
   
},

{
    tableName: 'properties',
    sequelize: db.sequelize
},


)