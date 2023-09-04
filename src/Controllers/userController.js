const userModel=require("../Models/userModel")

const express = require("express")
const app=express() 


const bcrypt=require("bcrypt")     //FOR HASHING
const jwt=require("jsonwebtoken")  //TOKENIZATION

//PARSING THE INCOMING REQUESTS
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const multer=require("multer")
const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload= multer({
    storage:Storage
}).single("profile")

/*------------------- CREATING A USER -------------------  */

const addUser = async (req, res) => {

    const { username, email, password, mobile } = req.body;

    try {
        // Finding the user in MongoDB
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ "msg": "User already exists" });
        } else {
            
            
            // Creating a user in MongoDB
            upload(req, res, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    try {

                    // Generate a salt
                    const salt = await bcrypt.genSalt(10);
                
                    // Hash the password using the generated salt
                    const hashPassword = await bcrypt.hash(req.body.password, salt);

                    const result = await userModel.create({
                         username: req.body.username,
                         email: req.body.email,
                         mobile: req.body.mobile,
                         profile: {
                            data: req.file.filename,
                            contentType: "image/png"
                          },
                         password: hashPassword // Use the hashed password
                        });


                        const token = jwt.sign({ email: email, id: result._id }, process.env.SECRET_KEY);
                        return res.status(201).json({user:result, token: token });
                    } catch (error) {
                        console.log(error.message);
                        return res.status(500).json(error.message);
                    }
                }
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}



/*------------------- UPDATING A USER -------------------  */

const updateUser=async(req,res)=>{

    const {username,email,password,mobile}=req.body
     
    // console.log(req.userid +"sasi")
    
    try{

        //hashing the password
        const hashPassword=await bcrypt.hash(password,10)

        //updating the user
        const exisitinguser=await userModel.updateOne({email:email},{
           $set:{ 
            username:username,
            email:email,
            mobile:mobile,
            password:hashPassword}
        })

        if(!exisitinguser){
            return res.status(400).json({"msg":"enter a valid user mail"})
        }

        return res.status(201).json({msg:`${email} user successfully updated`})
   
    }
    catch(error){

        return res.status(500).json(error.message)
    }

}


/*------------------- RETERIVING USERSLIST -------------------  */

const getUsers=async(req,res)=>{

    const {username,email,password,mobile}=req.body

        try{
    
            if(email || username){

                const getusers=await userModel.findOne({$or:[{email:email},{username}]})
                res.status(200).send(getusers)
                
            }
            else{
                const getusers=await userModel.find({})
                res.status(200).send(getusers)
            }
    
        }
        catch(error){
            
            return res.status(500).json(error.message)
        }
    
}


/*------------------- DELETING A USER -------------------  */

const deleteUser=async(req,res)=>{

    const {username,email,password,mobile}=req.body


    try{

        //deleting a user
        const deleteuser=await userModel.deleteOne({email:email})
      
        return res.status(200).json({msg:`${email} user deleted`})
   
    }
    catch(error){
       
        return res.status(500).json(error.message)
    }

}


module.exports={addUser,getUsers,updateUser,deleteUser}