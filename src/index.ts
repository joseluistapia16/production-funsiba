import express from "express";
import AvatarRoutes from "./routes/avatar.routes";
import UserRoutes from "./routes/users.routes";
import SubjectRoutes from "./routes/subject.routes";
import path from "path";
import cors from "cors";

const app: express.Application = express();
const PORT = 4000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(AvatarRoutes);
app.use(SubjectRoutes);
app.use(UserRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
