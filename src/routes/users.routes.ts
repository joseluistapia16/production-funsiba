import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  login,
} from "../controllers/user.controller";

const router: Router = Router();

router.route("/user").post(createUser);

router.route("/users").get(getAllUsers);

router.route("/login").post(login);

router.route("/user/:id").get(getUser);

router.route("/user").delete(deleteUser);

export default router;
