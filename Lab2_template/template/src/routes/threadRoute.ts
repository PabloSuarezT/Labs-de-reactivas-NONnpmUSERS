import { Router } from "express";
import { getThreads } from "../controller/threadsController";

const router = Router();

/**  escriba aca sus rutas **/
router.get("/data.json", getThreads);

export default router;