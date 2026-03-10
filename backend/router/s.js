const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// REGISTER
exports.register = async(req,res)=>{

try{

const {username,password} = req.body

const exist = await User.findOne({username})

if(exist){
return res.status(400).json({message:"User already exists"})
}

const hashedPassword = await bcrypt.hash(password,10)

const user = await User.create({
username,
password:hashedPassword
})

res.json({message:"User created"})

}catch(error){
console.log(error)
res.status(500).json({message:"Server error"})
}

}


// LOGIN
exports.login = async(req,res)=>{

try{

const {username,password} = req.body

const user = await User.findOne({username})

if(!user){
return res.status(400).json({message:"User not found"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({message:"Wrong password"})
}


const accessToken = jwt.sign(
{
userId:user._id,
username:user.username
},
process.env.SECRETJWTKEY,
{expiresIn:"30m"}
)


const refreshToken = jwt.sign(
{
userId:user._id
},
process.env.REFRESHJWTKEY,
{expiresIn:"7d"}
)


res.json({
accessToken,
refreshToken
})

}catch(error){
console.log(error)
res.status(500).json({message:"Server error"})
}

}



// REFRESH TOKEN
exports.refreshToken = (req,res)=>{

const {refreshToken} = req.body

if(!refreshToken){
return res.status(401).json({message:"No refresh token"})
}

jwt.verify(refreshToken,process.env.REFRESHJWTKEY,(err,user)=>{

if(err){
return res.status(403).json({message:"Invalid refresh token"})
}

const newAccessToken = jwt.sign(
{
userId:user.userId
},
process.env.SECRETJWTKEY,
{expiresIn:"30m"}
)

res.json({accessToken:newAccessToken})

})

}