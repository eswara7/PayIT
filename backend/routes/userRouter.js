const express = require('express')
const { signUp, getUser, signIn, updateUser, getBulk } = require('../controllers/userController')
const { authMiddleware } = require('../middleware')
const userRouter = express.Router()

userRouter.get("/getUser",authMiddleware,getUser)
userRouter.post("/signup",signUp)
//userRouter.get("/users",getUsers)
userRouter.post("/signin",signIn)
userRouter.put("/update",authMiddleware,updateUser)
userRouter.get("/bulk",getBulk)

module.exports = {
    userRouter
}