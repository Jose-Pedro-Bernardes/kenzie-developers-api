import express, { Application, json } from "express";
import "dotenv/config";
import {
  idDeveloperVerification,
  payloadValidation,
  validateNewDeveloper,
  validateNewDeveloperInfo,
} from "./middlewars";
import {
  listDeveloperById,
  registerAdicionalInfo,
  registerNewDeveloper,
  removeDeveloper,
  updateDeveloperData,
} from "./logic";

const app: Application = express();

app.use(json());

app.post(
  "/developers",
  payloadValidation,
  validateNewDeveloper,
  registerNewDeveloper
);
app.get("/developers/:id", idDeveloperVerification, listDeveloperById);
app.patch(
  "/developers/:id",
  payloadValidation,
  idDeveloperVerification,
  updateDeveloperData
);
app.delete("/developers/:id", idDeveloperVerification, removeDeveloper);
app.post(
  "/developers/:id/infos",
  idDeveloperVerification,
  validateNewDeveloperInfo,
  registerAdicionalInfo
);

app.post("/projects");
app.get("/projects/:id");
app.patch("/projects/:id");
app.delete("/projects/:id");
app.post("/projects/:id/technologies");
app.delete("/projects/:id/technologies/name");

export default app;
