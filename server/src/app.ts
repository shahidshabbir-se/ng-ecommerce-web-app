import express from "express";
import dotenv from "dotenv";
import setupModuleAliases from "./module_alias";
dotenv.config();

const app = express();
app.use(express.json());
setupModuleAliases();

import { prisma } from "@configs/prisma.config";
prisma.$connect();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("App is running at port" + process.env.PORT);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
