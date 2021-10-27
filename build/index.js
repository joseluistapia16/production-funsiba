"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const avatar_routes_1 = __importDefault(require("./routes/avatar.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(
  cors_1.default({
    origin: "*",
  })
);
app.use(express_1.default.json());
app.use(avatar_routes_1.default);
app.use(subject_routes_1.default);
app.use(users_routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
