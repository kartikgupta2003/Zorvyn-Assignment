import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const protect = async(req , res , next)=>{
    const {uid} = req.cookies ;

    try{
        if(!uid){
            const err = new Error("Unauthorized");
            err.status = 403;
            throw err ;
        }

        const decoded = jwt.verify(uid , process.env.JWT_SECRET);

        if(decoded){
            const user = await User.findById(decoded.id);
            req.user = user ;
            next();
        }
        else{
            const err = new Error("Unauthorized");
            err.status = 403;
            throw err ;
        }
    }catch(err){
        next(err);
    }
}

export default protect;