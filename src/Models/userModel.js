const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        minlength: 5, // Minimum length for the username
        maxlength: 20, // Maximum length for the username
        unique: true, // For unique username
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator:(value)=>{
                //email validation using regex
                const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return email_regex.test(value);
            },
            message: 'Invalid email',
        },
    },
    password: {
        type: String,
    },
    mobile: {
        type: Number,
        required: true,
        validate: {
            validator:(value)=>{
                //  mobile number validation using regex
                const mobile_regex = /^[0-9]{10}$/;
                return mobile_regex.test(value.toString());
            },
            message: 'Invalid mobile number , enter 10 digits valid number',
        },
    },
    profile: {
        data: Buffer,
        contentType: String,
    }

},{timestamps:true})

module.exports=mongoose.model("users",userSchema)