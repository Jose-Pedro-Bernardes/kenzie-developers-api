import { QueryResult } from "pg";

interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

type developerCreate = Omit<IDeveloper, "id">;
type developerResult = QueryResult<IDeveloper>;

export { IDeveloper, developerCreate, developerResult };
