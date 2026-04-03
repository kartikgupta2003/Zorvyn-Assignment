import User from "../Models/userModel.js";
import generateToken from "../Config/generateToken.js";

export const signup = async(req,res,next)=>{
    const {name , email , password } = req.body ;

    try{
        if(!name || !email || !password){
            const err= new Error("Please enter all the required fields");
            err.status=400;
            throw err;
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            const err = new Error("User with this email id already exists");
            err.status = 400 ;
            throw err;
        }

        const user = await User.create({
            name, 
            email , 
            password
        })

        res.status(200);
        return res.send({message : "User registered successfully!"});

    }catch(err){
        next(err);
    }
}

export const signin = async(req , res , next)=>{
    const {email , password} = req.body ;

    try{
        if(!email || !password){
            const err = new Error("Please fill all the required fields");
            err.status = 400 ;
            throw err;
        }

        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password))){
            const token = generateToken(user._id);
            res.cookie("uid" , token , {maxAge : 24*60*60*1000});
            return res.send({message : "User signedin successfully!"})
        }
        else{
            const err = new Error("Incorrect email or password!");
            err.status = 401 ;
            throw err ;
        }

    }catch(err){
        next(err);
    }
}


