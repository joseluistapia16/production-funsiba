"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avatar_controller_1 = require("../controllers/avatar.controller");
const router = express_1.Router();
router.route("/avatar/:id").get(avatar_controller_1.getAvatarbyId);
router.route("/avatars").get(avatar_controller_1.getAvatars);
exports.default = router;
