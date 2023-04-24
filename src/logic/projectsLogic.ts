import { Response, Request } from "express";
import format from "pg-format";
import { client } from "../database";
import { IProject, projectResult } from "../interface/projectsInterfaces";

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

export { registerNewProject };
