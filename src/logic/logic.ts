import { Response, Request } from "express";
import format from "pg-format";
import { client } from "../database";
import {
  developerReq,
  developerInfoResult,
  developerResult,
  IProject,
  projectResult,
} from "../interface/interfaces";

const registerNewDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: developerReq = req.body;

  const queryString = format(
    `
    INSERT INTO developers(%I)
    VALUES(%L)
    RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: developerResult = await client.query(queryString);
  const createdDeveloper = queryResult.rows[0];

  return res.status(201).json(createdDeveloper);
};

const listDeveloperById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload = req.params;

  const queryString = format(
    `
  SELECT
    dev."id" "developerId",
    dev."name" "developerName",
    dev."email" "developerEmail",
    dev_info."developerSince" "developerInfoDeveloperSince",
    dev_info."preferredOS" "developerInfoPreferredOS"
  FROM 
    developers dev
  LEFT JOIN
    developer_infos dev_info ON dev."id" = dev_info."developerId"
  WHERE    
    dev.id = %L;
`,
    payload.id
  );

  const queryResult = await client.query(queryString);

  return res.json(queryResult.rows[0]);
};

const updateDeveloperData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: developerReq = req.body;
  const id = parseInt(req.params.id);
  const arrayNewInfo = [];

  if (payload.name) {
    arrayNewInfo.push(`name = ${payload.name}`);
  }

  if (payload.email) {
    arrayNewInfo.push(`email = ${payload}`);
  }

  const newInfo = arrayNewInfo.join(", ");

  const queryString = format(
    `
  
  UPDATE developers SET ${newInfo} WHERE id = %L RETURNING *;
  
  `,
    id
  );

  const queryResult: developerResult = await client.query(queryString);
  const updatedDeveloper = queryResult.rows[0];

  return res.status(200).json(updatedDeveloper);
};

const removeDeveloper = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  const id = parseInt(req.params.id);

  const queryString = format(
    `
    DELETE FROM developers WHERE id = %L;
  `,
    id
  );

  const queryResult = await client.query(queryString);

  return res.status(204).json();
};

const registerAdicionalInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const payload = req.body;

  const queryString = format(
    `
  
  INSERT INTO developer_infos(%I, developerId)
  VALUES(%L, ${id})
  RETURNING *;

  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResultRes: developerInfoResult = await client.query(queryString);
  const developerInformation = queryResultRes.rows[0];

  return res.status(201).json(developerInformation);
};

const registerNewProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: IProject = req.body;

  if (typeof payload.endDate === "undefined") {
    payload.endDate = null;
  }

  const queryString = format(
    `
  
  INSERT INTO projects(%I)
  VALUES (%L)
  RETURNING *;
  
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: projectResult = await client.query(queryString);
  const project = queryResult.rows[0];

  return res.status(201).json(project);
};

export {
  registerNewDeveloper,
  listDeveloperById,
  updateDeveloperData,
  removeDeveloper,
  registerAdicionalInfo,
  registerNewProject,
};
