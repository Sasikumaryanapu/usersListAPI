const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{

    try{

        let token=req.headers.authorization;

        if(token){
            token=token.split(" ")[1]
            console.log(token)
            let user=jwt.verify(token,process.env.SECRET_KEY)
            console.log(process.env.SECRET_KEY)
            req.userid=user.id
        }
        else{
           return res.status(401).json({"msg":"unauthorized user"})
        }

        next()

    }
    catch(error){
        console.log(error)
        res.status(401).json({"msg":"unauthorized "})

    }
}

module.exports=auth

