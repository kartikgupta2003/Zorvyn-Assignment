import mongoose , {Schema} from "mongoose";
import User from "./userModel.js";

const recordSchema = new mongoose.Schema({
    amount : {
        type : mongoose.Schema.Types.Decimal128 ,
        requred : true 
    } ,
    type : {
        type : String ,
        enum : ["income" , "expense"] ,
        index : true ,
        required : true 
    } ,
    category : {
        type : String 
    } ,
    date : {
        type : Date ,
        default : Date.now ,
        index : true 
    } ,
    description : {
        type : String 
    } 
} , {timestamps : true});

const Record = mongoose.model("Record" , recordSchema);

export default Record ;