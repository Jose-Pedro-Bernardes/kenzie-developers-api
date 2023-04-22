import { Request, Response, NextFunction } from "express";
import { client } from "./database";
import format from "pg-format";

const payloadValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;

  if (!payload.name && !payload.email) {
    return res.status(422).json({ message: "Invalid payload" });
  }

  if (Object.keys(payload).some((key) => key !== "name" && key !== "email")) {
    return res.status(422).json({
      message: "Invalid payload",
    });
  }

  if (payload.name && typeof payload.name !== "string") {
    return res.status(422).json({ message: "Name must be a string" });
  }

  if (payload.email && typeof payload.email !== "string") {
    return res.status(422).json({ message: "Email must be a string" });
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
    return res.status(422).json({ message: "Invalid payload" });
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

export { validateNewDeveloper, idDeveloperVerification, payloadValidation };
