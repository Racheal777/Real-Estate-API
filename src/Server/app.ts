//importing modules
import Sequelize  from 'sequelize'
import express, {Application} from 'express'
import dotenv from 'dotenv'
import {router} from '../Routes/api'

const PORT = process.env.PORT || 7070

import db from '../Config/db.config'

//assigning app to express
const app: Application = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


db.sequelize.sync({force: false}).then(() => {
    console.log('db has been sync')
})

app.use('/api', router)

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))