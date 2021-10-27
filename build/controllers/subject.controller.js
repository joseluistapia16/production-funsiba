"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjects = void 0;
const database_1 = require("../config/database");
function getSubjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const result = yield conn.query("CALL `funsiba`.`sp_get_subjects`();");
            res.status(200).json(result[0][0]);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ status: "error", msg: e });
        }
    });
}
exports.getSubjects = getSubjects;
