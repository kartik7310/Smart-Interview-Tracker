import express from "express";

import {
createInterview,
getAllInterviews,
updateInterview,
deleteInterview

} from "../controllers/interview.controller.js"

import {protect} from "../middlewares/auth.middleware.js"

const router = express.Router();

// All transaction routes require login
router.use(protect);

router.post("/", createInterview);

router.get("/", getAllInterviews);


router.put("/:id", updateInterview);

router.delete("/:id", deleteInterview);

export default router;