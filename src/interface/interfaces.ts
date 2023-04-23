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
  developerSince: Date;
  preferredOS: "Windows" | "Linux" | "MacOS";
  developerId: number;
}

type developerInfo = Omit<IDeveloperInfo, "id" | "developerId">;
type developerInfoResult = QueryResult<developerInfo>;

interface IProject {
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate?: Date | null;
  developerId: number;
}

type projectResult = QueryResult<IProject>;

export {
  IDeveloper,
  developerReq,
  developerResult,
  developerInfoResult,
  IProject,
  projectResult,
};
