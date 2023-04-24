import express, { Application, json } from "express";
import "dotenv/config";
import {
  idDeveloperVerification,
  validateEmailExists,
  validateNewDeveloper,
  validateNewDeveloperInfo,
} from "./middleware/developersMiddlewars";
import {
  listDeveloperById,
  registerAdicionalInfo,
  registerNewDeveloper,
  removeDeveloper,
  updateDeveloperData,
} from "./logic/devLogic";
import { registerNewProject } from "./logic/projectsLogic";
import {
  validIdProject,
  validateNewProject,
} from "./middleware/projectsMiddleware";

const app: Application = express();

app.use(json());

app.post("/developers", validateNewDeveloper, registerNewDeveloper);
app.get("/developers/:id", idDeveloperVerification, listDeveloperById);
app.patch(
  "/developers/:id",
  idDeveloperVerification,
  validateEmailExists,
  updateDeveloperData
);
app.delete("/developers/:id", idDeveloperVerification, removeDeveloper);
app.post(
  "/developers/:id/infos",
  idDeveloperVerification,
  validateNewDeveloperInfo,
  registerAdicionalInfo
);

app.post("/projects", validateNewProject, validIdProject, registerNewProject);
app.get("/projects/:id");
app.patch("/projects/:id");
app.delete("/projects/:id");
app.post("/projects/:id/technologies");
app.delete("/projects/:id/technologies/name");

export default app;
