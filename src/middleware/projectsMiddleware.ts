import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import format from "pg-format";

const validIdProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;

  const queryString = format(
    `
  
  SELECT * FROM projects WHERE id = %L;
  
  `,
    id
  );

  const queryResult = await client.query(queryString);
  if (!queryResult.rows[0]) {
    return res.status(404).json({
      message: "Project not found.",
    });
  }
  next();
};

const validateDeveloperInProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;
  const developerId = payload.developerId;

  const queryString = format(`
  
    SELECT * FROM developers WHERE id = ${developerId};

  `);
  const queryResult = await client.query(queryString);
  if (!queryResult.rows[0]) {
    return res.status(404).json({ message: "Developer not found." });
  }
  next();
};

export { validIdProject, validateDeveloperInProject };
