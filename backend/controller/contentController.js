const { json } = require("stream/consumers")
const Content = require("../model/content")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadContent = async(req,res)=>{


  try{
    
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

    await content.save();

    res.status(201).json({
      success:true,
      content
    });

  }catch(error){
    res.status(500).json({
      success:false,
      message:"Something went wrong! Please try again"
    })
  }


}

const getAllContent = async(req,res)=>{
  try{
    const data = await Content.find().sort({createdAt:-1})

    if(data?.length>0){
      res.status(200).json({
        success:true,
        data
      })
    }else{
      res.status(400).json({
        success:false,
        message:"Empty List"
      })
    }

  }catch(error){
    res.status(500).json({
      success:false,
      message:"Something went wrong! Please try again"
    })
  }

}

// const deleteContent = async(req,res)=>{

//   try{
    
//   await Content.findByIdAndDelete(req.params.id)

//   res.status(200).json({
//     success:true,
//     message:"Successfully deleted"
//   })

//   }catch(error){
//     res.status(500).json({
//       success:false,
//       message:"Something went wrong! Please try again"
//     })
//   }
// }


const deleteContent = async(req,res)=>{

  try{

  const content = await Content.findById(req.params.id)

  if(!content){
    return res.status(404).json({
      success:false,
      message:"Content not found"
    })
  }

  // get public id from url
  const url = content.fileUrl
  const parts = url.split("/")
  const fileName = parts[parts.length - 1]
  const publicId = fileName.split(".")[0]

  // delete from cloudinary
  await cloudinary.uploader.destroy(publicId,{
    resource_type: content.type === "video" ? "video" : "image"
  })

  // delete from database
  await Content.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success:true,
    message:"Successfully deleted"
  })

  }catch(error){

  console.log(error)

  res.status(500).json({
    success:false,
    message:"Something went wrong"
  })

  }

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

      if(!updated){
        return res.status(404).json({
          success:false,
          message:"Error update"
        })
      }

      res.json(updated)

}catch(error){
    console.log(error)
    res.status(500).json("Update failed")

}

}

const getPublicContent = async (req, res) => {

  try {

    const now = new Date()

    const data = await Content.find({
      startTime: { $lte: now },
      endTime: { $gte: now }
    }).sort({ startTime: 1 })

    res.status(200).json({
      success: true,
      data
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again"
    })

  }

}

module.exports = {
uploadContent,
getAllContent,
deleteContent,
updateContent,
getPublicContent
}