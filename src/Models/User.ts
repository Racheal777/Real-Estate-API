
//importing models

import { Model, DataTypes, InferAttributes, InferCreationAttributes, } from "sequelize";
import db from '../Config/db.config'



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
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: true
        },

        password: {
            type: new DataTypes.STRING(128),
            allowNull: true
          },

        isVerified: {
            type: new DataTypes.BOOLEAN,
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