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

export default app;
