import express from "express";
import protect from "../Middlewares/protect.js";
import authAdmin from "../Middlewares/authAdmin.js";
import authAnalyst from "../Middlewares/authAnalyst.js";
import {createRecord , fetchAllRecords , fetchRecordById , filterRecords , updateRecord , deleteRecord} from "../Controllers/recordController.js"

const router = express.Router();


router.post("/create" , protect , authAdmin , createRecord);
router.get("/fetch" , protect , authAnalyst , fetchAllRecords);
router.get("/fetch/:id" , protect , authAnalyst , fetchRecordById);
router.get("/filter" , protect , authAnalyst , filterRecords);
router.patch("/update/:id" , protect , authAdmin , updateRecord);
router.delete("/delete/:id" , protect , authAdmin , deleteRecord);


export default router ;