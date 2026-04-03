import mongoose, { Schema } from "mongoose";
import bcrypt, { genSalt } from "bcrypt";

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true 
    } ,
    isActive : {
        type : Boolean ,
        default : true 
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true 
    } ,
    password : {
        type : String ,
        required : true 
    } ,
    role : {
        type : String ,
        enum : ["Viewer" , "Analyst" , "Admin"] ,
        default : "Viewer"
    }
} , {timestamps : true});

userSchema.pre("save" , async function (){
    const user = this ;
    if(!this.isModified("password")){
        return ;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password , salt);

    this.password=hashedPassword;

    
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

const User = mongoose.model("User" , userSchema);

export default User ;