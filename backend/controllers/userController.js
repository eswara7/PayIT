const { authMiddleware } = require("../middleware");
const { User, Account } = require("../dbSchema");
const { signUpBodyZodSchema, signInBodyZodSchema, updateBodyZodSchema } = require("../zodValidatoin");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* //GET ALL USERS
const getUsers = async (req,res,next)=>{
    let users;
    try {
        users = await User.find()
    } catch (error) {
        return res.status(400).json({message:"empty"})
    }
    res.status(200).json({users})
} */


//USER SIGNUP
const signUp = async (req,res,next)=>{
    const isValid= signUpBodyZodSchema.safeParse(req.body)
   
    if(!isValid.success){
        const errors = isValid.error.errors.map(err=>err.message)
         return res.status(400).json({success:false,message:errors})
     }
  
    try {
        const isUserExist = await User.findOne({
            username:req.body.username
        })
        if(isUserExist){
            return res.status(400).json({success:false,message:"user already exist please login"})
        }
     
        const hashedPassword = bcrypt.hashSync(req.body.password,saltRounds)
        const newUser = await User.create({
            username:req.body.username,
            password:hashedPassword,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        const userId = newUser._id;
        await Account.create({
            userId:userId,
            balance:(1+Math.random()*100000).toFixed(2)
        })
        await newUser.save()
        const token = jwt.sign({userId},process.env.JWT_SECRET);
        res.status(200).json({success:true,message:"user created",token:token,userId:userId})
    } catch (error) {
        res.status(500).json({ success: false, message: "Database error while creating user" });
    }
}



//SIGN IN
const signIn = async (req,res,next)=>{
    const isValid = signInBodyZodSchema.safeParse(req.body);

    if(!isValid.success){
        const errors = isValid.error.errors.map(err=>err.message)
        return res.status(400).json({success:false,message:errors})
     }
    let user;
    try {
        user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({success:false,message: "email doesn't exist please signup" });
        }
    } catch (error) {
        return res.status(500).json({ success:false,message: "server error" });
    }
    const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
    if(isPasswordCorrect){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
            res.json({success:true,message:"sign in successful",token:token})
            return;
    }
    else{
        return res.status(400).json({success:false,message:"passoword is incorrect"})
    }
    return res.status(400).json({success:false,message:"error while logging in"})

}


//UPDATE USER
const updateUser = async (req,res,next)=>{
    const {success} = updateBodyZodSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({message:"enter vaild details"})
    }
    await User.updateOne({
        _id:req.userId
    },req.body)
    res.status(200).json({message:"updated successfully"})
}

//get BULK users
const getBulk = async(req,res)=>{
    //  LIKE IN SQL 
    const filter = (req.query.filter || "")
    const users = await User.find({
        //or is for multiple query at same time
        $or:[{
            firstName:{
                "$regex":filter
            }},{
            lastName:{
               "$regex":filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}
const getUser = async(req,res)=>{
    const user = await User.findOne({
        _id:req.userId
    })
    if(!user){
        return res.status(411).json({success:false,message:"user not found"})
    }
    return res.status(200).json({success:true,user:user})
}

module.exports = {
    signUp,
    signIn,
    updateUser,
    getBulk,
    getUser
}




