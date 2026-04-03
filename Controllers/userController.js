import User from "../Models/userModel.js";
import mongoose from "mongoose";

// To toggle the status of user from active to inactive or vice versa 
export const toggleStatus = async (req, res, next) => {
    const {id} = req.params;

    try {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const err = new Error("Please provide a valid id!");
            err.status = 400;
            throw err;
        }

        const user = await User.findById(id);

        if (!user) {
            const err = new Error("User not found!");
            err.status = 404;
            throw err;
        }

        const originalStatus = user.isActive;

        await User.findByIdAndUpdate(id , {
            $set : {isActive : !originalStatus}
        })

        res.status(200).send("User status updated successfully");
    } catch (err) {
        next(err);
    }
}


// To update the role of a user 
export const updateUserRole = async (req, res, next) => {
    const {id , newRole} = req.body;

    try {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const err = new Error("Please provide a valid id!");
            err.status = 400;
            throw err;
        }

        if(newRole!== "Viewer" &&  newRole !== "Analyst"  && newRole !=="Admin"){
            const err = new Error("Please provide a valid role!");
            err.status = 400;
            throw err;
        }

        const user = await User.findById(id);

        if (!user) {
            const err = new Error("User not found!");
            err.status = 404;
            throw err;
        }

        if(user.role === "Admin" && newRole !== "Admin"){
            const adminCount = await User.countDocuments({role : "Admin"});

            if(adminCount === 1){
                const err = new Error("Cannot change role. At least one admin must exist.");
                err.status = 400;
                throw err;
            }
        }

        user.role = newRole ;
        await user.save();

        res.status(200).send("User role updated successfully");
    } catch (err) {
        next(err);
    }
}

