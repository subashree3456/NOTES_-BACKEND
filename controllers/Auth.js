import UserModel from "../models/Auth.js"
import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Register=async(req,res)=>{
    try {
          const {userName,email,password}=req.body
          if (!userName || !email || !password) {
            return res.status(303).json({success:false,message:" All faild are required"})
          }
        const existingUser= await UserModel.findOne({email})
          if (existingUser) {
            return res.status(303).json({success: false, message: "User already exists"});
            
          }
         const hasePassword= await bycript.hashSync(password,10)
           const NewUser= new UserModel({
            userName,email,password:hasePassword
           })
            NewUser.save()
           res.status(200).json({success:true,message:"User Register Successfully",user:NewUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:" Internal server error"})        
        
    }
}


const Login=async(req,res)=>{
    try {
          const {email,password}=req.body
        //   if (!email || !password) {
        //     return res.status(303).json({success:true,message:" All faild are required"})
            
        //   }
          const FindUser=await UserModel.findOne({email})
           if (!FindUser) {
            return res.status(404).json({success:false,message:" User Not Found please register"})
            
           }
           const comparePassword=await bycript.compare(password,FindUser.password)
           if (!comparePassword) {
            return res.status(303).json({success:false,message:" Invalid Password"})
            
           }
        
           const token= await jwt.sign({userId:FindUser._id},process.env.SecreateKey,{expiresIn:"3d"})
           
           const cookieOptions = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true, // enable it when your development in production
            sameSite: false, // enable it when your development in production
          };
          
          return res
            .status(200)
            .cookie("token", token, cookieOptions)
            .json({ success:true, message: "User login successful..." ,user:FindUser,token});

      // res.status(200).json({success:true,message:"user login successfully",user:FindUser,token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:" Internal server error"})
    }
}


const Logout=async(req,res)=>{
    try {
        res.clearCookie('token')
        return res.status(200).json({success:true,message:" Log out Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:" Internal server error"})
    }
}



export {Register,Login,Logout}


