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
import {
  listProjectsById,
  registerNewProject,
  registerNewTech,
  removeProject,
  removeTech,
  updatedProject,
} from "./logic/projectsLogic";
import {
  validIdProject,
  validateDeveloperInProject,
  validateNewTech,
  validateRemoveTech,
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

app.post("/projects", validateDeveloperInProject, registerNewProject);
app.get("/projects/:id", validIdProject, listProjectsById);
app.patch(
  "/projects/:id",
  validIdProject,
  validateDeveloperInProject,
  updatedProject
);
app.delete("/projects/:id", validIdProject, removeProject);
app.post(
  "/projects/:id/technologies",
  validIdProject,
  validateNewTech,
  registerNewTech
);
app.delete(
  "/projects/:id/technologies/:name",
  validIdProject,
  validateRemoveTech,
  removeTech
);

export default app;
