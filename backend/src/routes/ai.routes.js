import express from "express";
import { getResponse } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/get-review", getResponse);

export default router;
