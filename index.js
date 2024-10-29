const express = require("express") 
const cors = require('cors')
require('dotenv').config() //used to load content of.env file into process.env

require('./dbConnections/connection')

const router = require('./routes/router')

const pfServer = express()
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer started at the port:${PORT} and waiting for the client request!!!`);
})
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:green;">PF server Started and waiting for client request</h1>`)
})