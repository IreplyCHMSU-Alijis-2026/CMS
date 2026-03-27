const express = require('express');
require("dotenv").config()
const AdminRouter = require("./router/adminroutes")
const contentRouter = require("./router/contentRoutes")
const connectDatabase = require('./database/db');
const cookieParser = require("cookie-parser")
const cors = require("cors");


const app = express()

const cron = require("node-cron");
const Content = require("./model/content");

app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://192.168.68.112:5173"
//   ],
//   credentials: true
// }));

app.use(cors({
  origin: true,
  credentials: true
}))


app.use(AdminRouter);
app.use(contentRouter);

connectDatabase()


cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const result = await Content.deleteMany({
      endTime: { $lte: now }
    });

    if (result.deletedCount > 0) {
      console.log(`Deleted ${result.deletedCount} expired content`);
    }

  } catch (err) {
    console.error("Cron delete error:", err);
  }
})

app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`The server is running in Port ${process.env.PORT}`)
})