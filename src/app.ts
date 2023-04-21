import express, { Application, json } from "express";
import "dotenv/config";
import { validateNewDeveloper } from "./middlewars";
import { registerNewDeveloper } from "./logic";

const app: Application = express();

app.use(json());

app.post("/developers", validateNewDeveloper, registerNewDeveloper);
app.get("developers/:id");
app.patch("developers/:id");
app.delete("developers/:id");
app.post("/developers/:id/infos");

export default app;
