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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const conn = yield database_1.connect();
            yield conn.query("set @error = ''");
            yield conn.query(`CALL funsiba.sp_create_user('${user.username}', ${user.avatar_id}, @error);`);
            const result = yield conn.query(`SELECT @error as error;`);
            res.status(200).json(result[0][0]);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ status: "error", msg: e });
        }
    });
}
exports.createUser = createUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const result = yield conn.query(`SELECT user.*, avatar.url FROM funsiba.user, funsiba.avatar WHERE user.avatar_id = avatar.avatar_id;`);
            res.status(200).json(result[0]);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ status: "error", msg: e });
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const result = yield conn.query("SELECT u.*, a.url FROM funsiba.user u , avatar a  WHERE u.avatar_id = a.avatar_id AND user_id = ?;", [user_id]);
            res.status(200).json(result[0][0]);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ status: "error", msg: e });
        }
    });
}
exports.getUser = getUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        try {
            const conn = yield database_1.connect();
            yield conn.query("delete from user where user_id = ?", [id]);
            res.status(200).json({ status: "success", msg: "User deleted" });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ status: "error", msg: e });
        }
    });
}
exports.deleteUser = deleteUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, avatar_id } = req.body;
        try {
            const conn = yield database_1.connect();
            const result = yield conn.query("SELECT * FROM funsiba.user u, avatar a WHERE u.avatar_id = a.avatar_id AND u.username = ? AND u.avatar_id = ?;", [username, avatar_id]);
            if (result[0].length === 0) {
                return res.status(404).json({ status: "error", msg: "User not found" });
            }
            else {
                const user = result[0][0];
                const token = jsonwebtoken_1.default.sign({
                    user_id: user.user_id,
                    username: user.username,
                    avatar_id: user.avatar_id,
                    score: user.score,
                }, "secret", { expiresIn: "1h" });
                res.status(200).json({ status: true, token });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: false, msg: error });
        }
    });
}
exports.login = login;
