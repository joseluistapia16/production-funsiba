import { Router } from "express";
import { getSubjects } from "../controllers/subject.controller";

const router: Router = Router();

router.route("/subjects").get(getSubjects);

export default router;
