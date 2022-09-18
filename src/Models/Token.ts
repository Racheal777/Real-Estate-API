
//importing models

import { Model, DataTypes, ForeignKey } from "sequelize";
import db from '../Config/db.config'
import { uuid } from 'uuidv4';
import {User} from './User'



interface TokenAttributes {
    id: string
    token: string
    userId: string
    createdAt: Date
    updatedAt: Date

}

export class Token extends Model<TokenAttributes>{
   declare id: ForeignKey<string>;
}

//Token.belongsTo(User, {foreignKey: 'userId'});


Token.init(
    {
        id: {
          type: DataTypes.UUID,
          
          primaryKey: true
        },

        token: {
          type: new DataTypes.STRING(128),
          allowNull: false
        },

        userId: {
            type: new DataTypes.STRING,
            allowNull: false,
            onDelete: "cascade",
            onUpdate: "cascade",
            //references: {model: "users", key: "id"}
        },

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'tokens',
       sequelize: db.sequelize // passing the `sequelize` instance is required
      }
)