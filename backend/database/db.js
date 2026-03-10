const mongoose = require("mongoose")
require("dotenv").config()

const connectDatabase = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_KEY);
        console.log("Database connected successfully")

    }catch(error){
        console.error("Database connection is faild, ",error);
        process.exit(1);
    }
}

module.exports=connectDatabase;