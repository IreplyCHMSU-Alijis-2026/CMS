const mongoose = require("mongoose")

const contentSchema = new mongoose.Schema({

title:String,
type:String,
fileUrl:String,
startTime:Date,
endTime:Date

},{timestamps:true})

module.exports = mongoose.model("Content",contentSchema)