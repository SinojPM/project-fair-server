//register logic
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.registerController =async (req,res)=>{
    console.log("inside register controller");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("account already exists")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await  newUser.save()
            res.status(200).json(newUser)
        }
        
    }catch(err){
        res.status(401).json(err)
    }
}

exports.loginController = async(req,res)=>{
    console.log("inside loginComponent");
    const {email,password} = req.body
    console.log(email,password);
    //check email n password in user model

    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //allow login
            const token = jwt.sign({userid:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("invalid email/password!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
    
    
}

exports.editProfileController = async (req,res)=>{
    console.log("editProfileController");
    const { username,email,password,github,linkedin,profilePic } = req.body
    const uploadImg = req.file?req.file.filename:profilePic
    const userId = req.userId
    try{
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilePic:uploadImg
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)
    }
    
}