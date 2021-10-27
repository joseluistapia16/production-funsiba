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
exports.getAvatarbyId = exports.getAvatars = exports.helloWorld = void 0;
const database_1 = require("../config/database");
function helloWorld(req, res) {
    res.json({ msg: "Hello World!" });
}
exports.helloWorld = helloWorld;
function getAvatars(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const avatars = yield conn.query("CALL `funsiba`.`sp_get_avatars`();");
            res.status(200).json(avatars[0][0]);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ status: "error", msg: e });
        }
    });
}
exports.getAvatars = getAvatars;
function getAvatarbyId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const avatar = yield conn.query(`CALL sp_get_avatar_by_id(${req.params.id});`);
            res.status(200).json(avatar[0][0]);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ status: "error", msg: e });
        }
    });
}
exports.getAvatarbyId = getAvatarbyId;
