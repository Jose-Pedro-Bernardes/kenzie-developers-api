import { Response, Request } from "express";
import format from "pg-format";
import { client } from "./database";
import { developerCreate, developerResult } from "./interfaces";

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
  return res.status(200).json();
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
