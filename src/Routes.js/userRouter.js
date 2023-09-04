//imports 

const { addUser, getUsers, updateUser, deleteUser } = require("../Controllers/userController");
const auth = require("../Middleware/auth"); 

const express=require("express");
const userRouter=express.Router()


//creating user
userRouter.post("/addUser",addUser)

//reading all the users
userRouter.get("/retriveUsers",getUsers)

//updating user
userRouter.put("/updateUser",auth,updateUser)


//deletion of user
userRouter.delete("/removeUser",auth,deleteUser)


module.exports=userRouter
