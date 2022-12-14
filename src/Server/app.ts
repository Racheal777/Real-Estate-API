//importing modules
import Sequelize  from 'sequelize'
import express, {Application} from 'express'
import helmet from 'helmet'
import router from '../Routes/api'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const PORT = process.env.PORT || 7070

import db from '../Config/db.config'

//assigning app to express
const app: Application = express()

//cors configuration
var corsOptions = {
    origin: 'http://localhost:3000',
    
  }
//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(cookieParser())
app.use(express.static('images'))
app.use('/images', express.static('images'))



db.sequelize.sync({force: false}).then(() => {
    console.log('db has been sync')
})

app.use('/api', router)

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))