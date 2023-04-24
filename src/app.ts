import express, { Application, json } from "express";
import "dotenv/config";
import {
  idDeveloperVerification,
  payloadValidation,
  validateEmailExists,
  validateNewDeveloper,
  validateNewDeveloperInfo,
  validateNewProject,
} from "./middleware/middlewars";
import {
  listDeveloperById,
  registerAdicionalInfo,
  registerNewDeveloper,
  registerNewProject,
  removeDeveloper,
  updateDeveloperData,
} from "./logic/logic";

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

app.post("/projects", validateNewProject, registerNewProject);
app.get("/projects/:id");
app.patch("/projects/:id");
app.delete("/projects/:id");
app.post("/projects/:id/technologies");
app.delete("/projects/:id/technologies/name");

export default app;
