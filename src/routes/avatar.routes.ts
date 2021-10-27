import { Router } from "express";
import { getAvatars, getAvatarbyId } from "../controllers/avatar.controller";

const router: Router = Router();

router.route("/avatar/:id").get(getAvatarbyId);

router.route("/avatars").get(getAvatars);

export default router;
