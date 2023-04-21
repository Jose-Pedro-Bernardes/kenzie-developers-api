import { Request, Response, NextFunction } from "express";
import { client } from "./database";
import format from "pg-format";

const validateNewDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export { validateNewDeveloper };
