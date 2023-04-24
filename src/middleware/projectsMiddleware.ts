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

const validateNewTech = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = req.body;
  const id = req.params.id;

  const queryString = format(
    `

SELECT * FROM technologies WHERE "name" = '%s';

`,
    name
  );

  const queryResult = await client.query(queryString);
  if (!queryResult.rows[0]) {
    return res.status(400).json({
      message: "Technology not supported.",
      options: [
        "JavaScript",
        "Python",
        "React",
        "Express.js",
        "HTML",
        "CSS",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ],
    });
  }
  const techId = queryResult.rows[0].id;
  const queryString3 = format(
    `
  
  SELECT * FROM projects_technologies WHERE "technologyId" = %L AND "projectId" = %L;
  
  `,
    techId,
    id
  );

  const queryResult3 = await client.query(queryString3);

  if (queryResult3.rows[0]) {
    return res.status(409).json({
      message: "This technology is already associated with the project",
    });
  }

  next();
};

export { validIdProject, validateDeveloperInProject, validateNewTech };
