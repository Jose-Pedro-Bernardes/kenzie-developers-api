import express, { Application, json } from "express";
import "dotenv/config";
import {
  idDeveloperVerification,
  reqValidation,
  validateNewDeveloper,
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
  reqValidation,
  validateNewDeveloper,
  registerNewDeveloper
);
app.get("/developers/:id", idDeveloperVerification, listDeveloperById);
app.patch(
  "/developers/:id",
  reqValidation,
  idDeveloperVerification,
  updateDeveloperData
);
app.delete("/developers/:id", idDeveloperVerification, removeDeveloper);
app.post(
  "/developers/:id/infos",
  idDeveloperVerification,
  registerAdicionalInfo
);

export default app;
