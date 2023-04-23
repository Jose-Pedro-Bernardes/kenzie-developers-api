import { Request, Response, NextFunction } from "express";
import { client } from "./database";
import format from "pg-format";

const payloadValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;
  const validPayload = ["name", "email"];

  if (!payload.name && !payload.email) {
    return res.status(400).json({ message: "Invalid payload" });
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

  if (Object.keys(payload).length !== 2 || !payload.name || !payload.email) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const queryString = format(
    `
    SELECT * FROM developers WHERE email = %L;
    `,
    payload.email
  );

  const queryResult = await client.query(queryString);
  if (queryResult.rows.length) {
    return res.status(409).json({ error: "Email already in use" });
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

const validateNewDeveloperInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);
  const payload = req.body;

  if (!payload.preferredOS || !payload.developerSince) {
    return res.status(400).json({
      message:
        "The preferredOS and/or developerSince fields were not provided.",
    });
  }

  const queryString = format(`
  
  SELECT developerId FROM developers_info WHERE developerId = ${id};
  
  `);

  const queryResult = await client.query(queryString);
  if (queryResult.rows[0]) {
    return res.status(409).json({ message: "Developer infos already exists." });
  }

  if (
    payload.preferredOS !== "Windows" &&
    payload.preferredOS !== "MacOs" &&
    payload.preferredOS !== "Linux"
  ) {
    const validOSOptions = ["Windows", "Linux", "MacOS"];
    return res.status(400).json({
      message: "Invalid OS option.",
      options: `${validOSOptions}`,
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
};
