const Admin = require('../model/adminModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require("dotenv").config()

const register = async(req,res)=>{
    try{
        const {username,password}=req.body;
        const checkAdmin=await Admin.findOne({username});
        if(checkAdmin){
            return res.status(400).json({
                success:false,
                message:"Admin is already exists"
            })
        }

        const salt =await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        const createAcc = new Admin({
            username,
            password:hashPass
        })

        await createAcc.save()

         if(createAcc){
            res.status(201).json({
                success:true,
                message:"User register Successfully"
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Unable to register user! Please try again"
            })
        }if(createAcc){
            
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occure! Please try again",
        })
    }
}




const generateAccessToken = (admin)=>{
return jwt.sign(
{id:admin._id},
process.env.JWT_ACCESS_SECRET,
{expiresIn:"15m"}
)
}


const generateRefreshToken = (admin)=>{
return jwt.sign(
{id:admin._id},
process.env.JWT_REFRESH_SECRET,
{expiresIn:"7d"}
)
}

const login = async(req,res)=>{
try{
    const {username,password} = req.body;

const admin = await Admin.findOne({username})

if(!admin) return res.status(400).json({success:false,message:"User doesn't exists"})

const match = await bcrypt.compare(password,admin.password)

if(!match) return res.status(400).json({success:false,message:"Wrong password"})

const accessToken = generateAccessToken(admin)
const refreshToken = generateRefreshToken(admin)

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  sameSite: "lax",   // important
  secure: false      // true if HTTPS
});

res.status(200).json({
    success:true,
    message:"Log in Successfully",
    accessToken
})

}catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occure! Please try again",
         
        })
    }
}




const refreshToken = (req,res)=>{

const token = req.cookies.refreshToken

if(!token) return res.status(401).json("No refresh token")

try{

const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET)

const accessToken = jwt.sign(
  { id: decoded.id },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: "15m" }
);

res.json({accessToken})

}catch{

res.status(403).json("Invalid refresh token")

}
}




module.exports ={
    register,
    login,
    refreshToken
}

