import { Response, Request } from "express";
import format from "pg-format";
import { client } from "./database";
import {
  IListDeveloperRes,
  developerCreate,
  developerInfoResult,
  developerResult,
} from "./interfaces";

const registerNewDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: developerCreate = req.body;

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
  const id: number = parseInt(req.params.id);

  const queryString = format(
    `
  SELECT * FROM developers WHERE id = %L;
  `,
    id
  );
  const queryResult: developerResult = await client.query(queryString);
  const developer = queryResult.rows[0];

  const queryString2 = format(
    `
  
  SELECT developerSince, preferredOS FROM developers_Info WHERE developerId = %L;
  
  `,
    id
  );
  const queryResult2: developerInfoResult = await client.query(queryString2);
  const developerInfo = queryResult2.rows[0];

  const developerRes = { ...developer, ...developerInfo };

  return res.status(200).json(developerRes);
};

const updateDeveloperData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

const removeDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(204).json();
};

const registerAdicionalInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(201).json();
};

export {
  registerNewDeveloper,
  listDeveloperById,
  updateDeveloperData,
  removeDeveloper,
  registerAdicionalInfo,
};
