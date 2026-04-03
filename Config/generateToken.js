import jwt from "jsonwebtoken";

const generateToken = (id)=>{
    // //(process.env.JWT_SECRET);
    return jwt.sign({id} ,  process.env.JWT_SECRET , {
        expiresIn : "1d"
    });
}

export default generateToken ;