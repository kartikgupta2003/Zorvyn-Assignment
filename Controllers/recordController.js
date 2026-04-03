import Record from "../Models/recordModel.js";
import mongoose from "mongoose";

// To create a record 
export const createRecord = async(req , res , next)=>{

    const {amount , type , category , date , description } = req.body ;


    try{
        if(!amount || !type ){
            const err = new Error("Please fill all the required fields");
            err.status = 400;
            throw err ;
        }

        if (isNaN(amount) || amount <= 0) {
            const err = new Error("Invalid amount");
            err.status = 400;
            throw err;
        }

        if(type!=="expense" && type!== "income"){
            const err = new Error("Invalid record type!");
            err.status = 400;
            throw err ;
        }

        if(req.body.date && isNaN(new Date(req.body.date))){
            const err = new Error("Please provide a valid date");
            err.status = 400;
            throw err ;
        }
        
        const record = await Record.create({
            amount ,
            type ,
            category ,
            date : date || undefined , 
            description
        })

        res.status(200);
        res.send(record);

    }catch(err){
        next(err);
    }     
}

// to get a particular record by id  
export const fetchRecordById = async(req,res,next)=>{
    const {id} = req.params ;
    try{
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            const err = new Error("Please provide a valid id!");
            err.status=400;
            throw err;
        }

        const record = await Record.findById(id);

        if(!record){
            const err = new Error("Record not found!");
            err.status = 404;
            throw err;
        }
        else{
            res.status(200);
            res.send(record);
        }
    }catch(err){
        next(err);
    }
}

// to fetch all records (paginated)
export const fetchAllRecords = async(req,res,next)=>{
    const {page=1 , limit=5} = req.query;

    try{
        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const skipped = (pageNumber - 1) * pageSize;
        const records = await Record.find({}).sort({date : -1}).lean().skip(skipped).limit(pageSize);
        res.send(records);

    }catch(err){
        const error = new Error("Error fetching records " + err.message);
        next(error);
    }
}


// to update a record 
export const updateRecord = async(req,res,next)=>{
    const {id}=req.params;
    const {field , value} = req.body;
    try{
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            const err = new Error("Please provide a valid id!");
            err.status=400;
            throw err;
        }

        const record = await Record.findById(id);

        if(!record){
            const err = new Error("Record not found!");
            err.status=404;
            throw err;
        }

        if(!field || !value){
            const err = new Error("Please provide a valid field and value to change!");
            err.status=400;
            throw err;
        }
        if(field !== "amount" && field !== "type" && field !== "category" && field !== "date" && field !== "description"){
            const err = new Error("Please provide a valid field or value to change!");
            err.status=400;
            throw err;
        }
        if(field === "amount"){
            if(isNaN(value) || value<=0){
                const err = new Error("Invalid amount!");
                err.status=400;
                throw err;
            }
        }
        if(field === "date"){
            if(isNaN(new Date(value))){
                const err = new Error("Please provide a valid date");
                err.status = 400;
                throw err ;
            }
        }
        if(field === "type"){
            if((value !=="income") && (value !== "expense")){
                const err = new Error("Type can only be income or expense!");
                err.status=400;
                throw err;
            }
        }


        const updatedRecord = await Record.findByIdAndUpdate(id , {
            $set : {[field] : value}
        } , {new : true , runValidators : true});

        res.send(updatedRecord);
    }catch(err){
        // const error = new Error("Error updating record "+err.message);
        next(err);
    }
}

// delete a record 
export const deleteRecord = async(req,res,next)=>{
    const {id} = req.params;

    try{
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            const err = new Error("Please provide a valid id!");
            err.status=400;
            throw err;
        }

        const record = await Record.findById(id);

        if(!record){
            const err = new Error("Record not found!");
            err.status=404;
            throw err;
        }

        await Record.findByIdAndDelete(id);

        res.status(200);
        res.json({message : "Record deleted succesfully!"});
    }catch(err){
        next(err);
    }
}

// filter records (paginated)
export const filterRecords = async(req,res,next)=>{ 
    const {page=1 , limit=5} = req.query;  
    const { type, category, sort = "desc" } = req.query;

    try{
        let filter = {};
        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const skipped = (pageNumber - 1) * pageSize;

        if(category){
            filter.category = { $regex: `^${category}$`, $options: "i" };
        }
        if(type){
            if(type === "income" || type === "expense"){
                filter.type = type ;
            }
            else{
                const err = new Error("Type can only be income or expense!");
                err.status=400;
                throw err;
            }
        }
        let sortOrder = -1 ;
        if(sort === "asc") sortOrder = 1;

        const records = await Record.find(filter).sort({date : sortOrder}).skip(skipped).limit(pageSize).lean();
        res.status(200);
        return res.send(records);
    }catch(err){
        next(err);
    }
}



