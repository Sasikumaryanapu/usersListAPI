const mongoose=require("mongoose")
const express = require("express")
const app=express() 
const cors=require("cors")


//IMPORTING A USERROUTER
const userRouter=require("./src/Routes.js/userRouter")

//CROSS-ORIGIN FOR ALLWOING THE OUTSIDE DOMAINS TO ACCESS 

app.use(cors({
    origin:"*"
}))


//CONFIGURING ENVIORNMENTAL VARIABLES 
const dotenv=require("dotenv")
dotenv.config()


//PROCESSING THE INCOMING REQUESTS
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("src/public"))


//USERS ROUTE
app.use("/users",userRouter)

//PORT NUMBER
PORT=process.env.PORT || 5000


/*------------------- SERVER CONNECTION -------------------  */

mongoose.connect(process.env.MONGO_URL)
.then(app.listen(PORT,()=>{
    console.log("server started on "+PORT)
}))
.catch((error)=>{
    console.log(error)
})
