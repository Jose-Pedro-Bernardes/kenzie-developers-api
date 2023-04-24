import { QueryResult } from "pg";

interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

type developerReq = Omit<IDeveloper, "id">;
type developerResult = QueryResult<IDeveloper>;

interface IDeveloperInfo {
  id: number;
  developerSince?: Date;
  preferredOS?: "Windows" | "Linux" | "MacOS";
  developerId?: number;
}

type developerInfo = Omit<IDeveloperInfo, "id" | "developerId">;
type developerInfoReq = Omit<IDeveloperInfo, "id">;
type developerInfoResult = QueryResult<developerInfo>;

export {
  IDeveloper,
  developerInfoReq,
  developerReq,
  developerResult,
  developerInfoResult,
};
