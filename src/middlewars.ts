import { Request, Response, NextFunction } from "express";
import { client } from "./database";
import format from "pg-format";

const reqValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;

  if (Object.keys(payload).length !== 2 || !payload.name || !payload.email) {
    return res.status(422).json({ message: "Invalid payload" });
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

export { validateNewDeveloper, idDeveloperVerification, reqValidation };
