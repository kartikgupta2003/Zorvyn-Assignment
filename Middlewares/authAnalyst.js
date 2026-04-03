import User from "../Models/userModel.js";

const authAnalyst = async(req , res , next)=>{
    const user = req.user;
    try{
        const dbUser = await User.findById(user._id);

        if(dbUser.role === "Analyst" || dbUser.role === "Admin"){
            next();
        }
        else{
            const err = new Error("Unauthorized");
            err.status = 403 ;
            throw err;
        }
    }catch(err){
        next(err);
    }
}

export default authAnalyst ;