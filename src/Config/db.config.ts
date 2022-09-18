//import {Sequelize}  from 'sequelize'
const { Sequelize, DataTypes } = require('sequelize')
import dotenv from 'dotenv'
dotenv.config()





//connecting to database
let databaseName = 'estates'
const sequelize = new Sequelize(`postgres://postgres:${process.env.PASSWORD}@localhost:5433/${databaseName}`) // Example for postgres

//checking if connection is done

let db =  sequelize.authenticate().then(() => {
    console.log(`Database connected to  ${databaseName}`)
}).catch(() => {
    console.log('error')
})

// const db = {Sequelize,sequelize, users:User, apartments:Apartment, owners:Owner }

db.Sequelize = Sequelize
db.sequelize = sequelize



// db.sync({force: true}).then(() => {
//         console.log('db has been resync')
//     })


export default  db

