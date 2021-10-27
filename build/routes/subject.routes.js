"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = require("../controllers/subject.controller");
const router = express_1.Router();
router.route("/subjects").get(subject_controller_1.getSubjects);
exports.default = router;
