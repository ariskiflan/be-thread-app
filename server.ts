import express from "express";
import * as dotenv from "dotenv";
import db from "./src/db";
import Route from "./src/routes";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use("/api/v1", Route);

app.get("/", async (req, res) => {
  const listUser = await db.user.findMany();
  const singleUser = await db.user.findFirst({
    where: {
      id: 1,
    },
  });
  res.send({
    listUser,
    singleUser,
  });
});

app.listen(port, async () => {
  await db.$connect();
  console.log(`Server is running at ${port}`);
});
