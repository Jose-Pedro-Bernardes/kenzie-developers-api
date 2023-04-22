import express, { Application, json } from "express";
import "dotenv/config";
import { idDeveloperVerification, validateNewDeveloper } from "./middlewars";
import { listDeveloperById, registerNewDeveloper } from "./logic";

const app: Application = express();

app.use(json());

app.post("/developers", validateNewDeveloper, registerNewDeveloper);
app.get("developers/:id", idDeveloperVerification, listDeveloperById);
app.patch("developers/:id");
app.delete("developers/:id");
app.post("/developers/:id/infos");

export default app;
