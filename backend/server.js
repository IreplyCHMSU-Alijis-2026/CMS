const express = require('express');
require("dotenv").config()
const AdminRouter = require("./router/adminroutes")
const connectDatabase = require('./database/db');
const cors = require("cors")

const app = express()


app.use(cors())
connectDatabase()
app.use(express.json())

app.use("/admin",AdminRouter)


app.listen(process.env.PORT,()=>{
    console.log(`The server is running in Port ${process.env.PORT}`)
})