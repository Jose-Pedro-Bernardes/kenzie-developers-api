import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import format from "pg-format";

const payloadValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;
  const validPayload = ["name", "email"];

  if (!payload.name && !payload.email) {
    return res.status(400).json({ message: "Invalid payload." });
  }

  const validKeys = ["name", "email"];
  const invalidKeys = Object.keys(payload).filter(
    (key) => !validKeys.includes(key)
  );

  if (invalidKeys.length != 0) {
    return res.status(400).json({
      message: `Invalid payload`,
    });
  }

  if (payload.name && typeof payload.name !== "string") {
    return res.status(400).json({ message: "Name must be a string" });
  }

  if (payload.email && typeof payload.email !== "string") {
    return res.status(400).json({ message: "Email must be a string" });
  }

  next();
};

const validateNewDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;

  const queryString = format(
    `
    SELECT * FROM developers WHERE email = %L;
    `,
    payload.email
  );

  const queryResult = await client.query(queryString);
  if (queryResult.rows.length) {
    return res.status(409).json({ message: "Email already in use" });
  }

  next();
};

const idDeveloperVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;

  const queryString = format(
    `
SELECT * FROM developers WHERE id = %L;
`,
    id
  );
  const queryResult = await client.query(queryString);
  if (!queryResult.rows[0]) {
    return res.status(404).json({ message: "Developer not found." });
  }

  next();
};

const validateEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;

  const queryString = format(
    `

    SELECT "email" FROM developers WHERE "email" ILIKE '%s'

    `,
    payload.email
  );

  const queryResult = await client.query(queryString);
  if (queryResult.rows[0]) {
    return res.status(409).json({ message: "Email alredy exists." });
  }

  next();
};

const validateNewDeveloperInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);
  const payload = req.body;

  const queryString = format(
    `
  
  SELECT * FROM developer_infos WHERE "developerId" = %L;
  
  `,
    id
  );

  const queryResult = await client.query(queryString);
  if (queryResult.rows[0]) {
    return res.status(409).json({ message: "Developer infos already exists." });
  }

  const validOS = ["Windows", "Linux", "MacOS"];

  if (!validOS.includes(payload.preferredOS)) {
    return res.status(400).json({
      message: "Invalid OS option.",
      options: ["Windows", "Linux", "MacOS"],
    });
  }

  next();
};

const validateNewProject = async (
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

export {
  validateNewDeveloper,
  idDeveloperVerification,
  payloadValidation,
  validateNewDeveloperInfo,
  validateNewProject,
  validateEmailExists,
};
