const express = require('express');
require("dotenv").config()
const AdminRouter = require("./router/adminroutes")
const contentRouter = require("./router/contentRoutes")
const connectDatabase = require('./database/db');
const cookieParser = require("cookie-parser")


const app = express()





app.use(express.json())
app.use(cookieParser())


app.use(AdminRouter);
app.use(contentRouter);

connectDatabase()
app.listen(process.env.PORT,()=>{
    console.log(`The server is running in Port ${process.env.PORT}`)
})