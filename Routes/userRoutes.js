import express from "express";
import protect from "../Middlewares/protect.js";
import authAdmin from "../Middlewares/authAdmin.js";
import authAnalyst from "../Middlewares/authAnalyst.js";
import {toggleStatus , updateUserRole} from "../Controllers/userController.js";

const router = express.Router();

router.patch("/toggle/:id" , protect , authAdmin , toggleStatus);
router.patch("/update" , protect , authAdmin , updateUserRole);

export default router ;