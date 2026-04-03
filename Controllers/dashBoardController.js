import Record from "../Models/recordModel.js";

// Fetch total income , expenses and net balance
export const summarize = async(req , res , next)=>{
    let totalIncome = 0 ;
    let totalExpense = 0 ;
    let netBalance =0 ;

    try{
        const result = await Record.aggregate([
            {
                $group : {
                    _id : "$type" ,
                    total : {$sum : "$amount"}
                }
            }
        ])

        result.forEach((item)=>{
            if(item._id === "income") totalIncome = item.total;
            if(item._id === "expense") totalExpense = item.total;
        })

        netBalance = totalIncome - totalExpense;

        res.status(200).json({
            totalIncome , 
            totalExpense ,
            netBalance
        });
        
    }catch(err){
        next(err);
    }
}

// give category wise total 
export const categoryBreakdown = async(req,res,next)=>{
    try{
        const result = await Record.aggregate([
            {
                $group : {
                    _id : "$category" ,
                    total : {$sum :
                        {$cond : [
                            {$eq : ["$type" , "income"]} ,
                            "$amount" ,
                            {$multiply : ["$amount" , -1]}
                        ]}
                    }
                }
            }
        ]);

        res.status(200).send(result);
    }catch(err){
        next(err);
    }
}

// Give last 5 transactions 
export const getRecentActivity = async(req,res,next)=>{
    try{
        const records = await Record.find({}).sort({date : -1}).limit(5).lean();

        res.status(200).send(records);
    }catch(err){
        next(err);
    }
}


// Give annual or monthly trends 
export const getMonthlyTrends = async(req,res,next)=>{
    try{
        const result = await Record.aggregate([
            {
                $group : {
                    _id : {
                        year : {$year : "$date"} ,
                        month : {$month : "$date"}
                    } ,
                    total : {
                        $sum : {
                            $cond : [
                                {$eq : ["$type" , "income"]} ,
                                "$amount" ,
                                {$multiply : ["$amount" , -1]}
                            ]
                        }
                    }
                } 
            } ,
            {
                $sort : {
                    "_id.year" : -1 ,
                    "_id.month" : -1
                }
            }
        ])

        res.status(200).json(result);
    }catch(err){
        next(err);
    }
}