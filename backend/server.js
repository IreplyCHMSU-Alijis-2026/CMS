const express = require('express');
require("dotenv").config()
const AdminRouter = require("./router/adminroutes")
const contentRouter = require("./router/contentRoutes")
const connectDatabase = require('./database/db');
const cookieParser = require("cookie-parser")
const cors = require("cors");


const app = express()



app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


app.use(AdminRouter);
app.use(contentRouter);

connectDatabase()
app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`The server is running in Port ${process.env.PORT}`)
})