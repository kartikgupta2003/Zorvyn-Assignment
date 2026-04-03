import express from "express";
import protect from "../Middlewares/protect.js";
import authAdmin from "../Middlewares/authAdmin.js";
import authAnalyst from "../Middlewares/authAnalyst.js";
import {summarize , getMonthlyTrends , getRecentActivity , categoryBreakdown} from "../Controllers/dashBoardController.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/summarize" , protect , summarize);
router.get("/monthly-trends" , protect , authAnalyst , getMonthlyTrends);
router.get("/recent-activity" , protect , authAnalyst , getRecentActivity);
router.get("/category" , protect , authAnalyst , categoryBreakdown);

export default router;
