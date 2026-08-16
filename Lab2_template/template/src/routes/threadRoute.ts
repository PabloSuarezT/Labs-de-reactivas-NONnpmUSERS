import { Router } from "express";
import path from "path";
import { getThreads, createThread } from "../controller/threadsController";

const router = Router();

/**  escriba aca sus rutas **/
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/data.json", getThreads);
router.post("/new", createThread);

export default router;