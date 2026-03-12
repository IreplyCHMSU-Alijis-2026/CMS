const Content = require("../model/content")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadContent = async(req,res)=>{

const {title,type,startTime,endTime} = req.body

if(!req.file) return res.status(400).json("File required")

const result = await cloudinary.uploader.upload(req.file.path,{
resource_type:type==="video"?"video":"image"
})

fs.unlinkSync(req.file.path)

const content = new Content({
title,
type,
fileUrl:result.secure_url,
startTime,
endTime
})

await content.save()

res.json(content)

}

const getAllContent = async(req,res)=>{

const data = await Content.find().sort({createdAt:-1})

res.json(data)

}

const deleteContent = async(req,res)=>{

await Content.findByIdAndDelete(req.params.id)

res.json("Deleted")

}

const updateContent = async (req,res)=>{

try{

const {title,type,startTime,endTime} = req.body

let updateData = {
title,
type,
startTime,
endTime
}

console.log(req.file)

if(req.file){

const result = await cloudinary.uploader.upload(req.file.path,{
resource_type:type==="video"?"video":"image"
})

fs.unlinkSync(req.file.path)

updateData.fileUrl = result.secure_url

}

const updated = await Content.findByIdAndUpdate(
req.params.id,
updateData,
{new:true}
)

res.json(updated)

}catch(error){
console.log(error)
res.status(500).json("Update failed")

}

}

const getPublicContent = async (req, res) => {
  const now = new Date();

  const data = await Content.find({
    startTime: { $lte: now },
    endTime: { $gte: now || new Date("9999-12-31") } 
  }).sort({ createdAt: 1 });

  res.json(data);
};

module.exports = {
uploadContent,
getAllContent,
deleteContent,
updateContent,
getPublicContent
}