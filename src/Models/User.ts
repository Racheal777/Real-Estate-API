
//importing models

import { Model, DataTypes } from "sequelize";
import db from '../Config/db.config'
import { uuid } from 'uuidv4';
import { Token } from "./Token";


interface UserAttributes {
    id: string
    name: string
    email: string
    password: string
    isVerified: boolean
    createdAt: Date
    updatedAt: Date

}

export class User extends Model<UserAttributes>{}

User.init(
    {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },

        name: {
          type: new DataTypes.STRING(128),
          allowNull: false
        },

        email: {
          type: new DataTypes.STRING(128),
          validate: {
            isEmail: true,
          },
          
          allowNull: true
        },

        password: {
            type: new DataTypes.STRING(128),
            allowNull: true
          },

        isVerified: {
            type: new DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
          },

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'users',
       sequelize: db.sequelize // passing the `sequelize` instance is required
      }


     
)

///User.hasOne(Token, { foreignKey: 'userId' });