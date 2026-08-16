import { Router } from "express";
import path from "path";
import { getThreads } from "../controller/threadsController";

const router = Router();

/**  escriba aca sus rutas **/
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/data.json", getThreads);

export default router;