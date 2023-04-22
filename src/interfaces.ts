import { QueryResult } from "pg";

interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

type developerCreate = Omit<IDeveloper, "id">;
type developerResult = QueryResult<IDeveloper>;

interface IListDeveloperRes {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: Date | null;
  developerInfoPreferredOS: string | null;
}

interface IDeveloperInfo {
  id: number;
  developerSince: Date;
  preferredOS: "Windows" | "Linux" | "MacOS";
  developerId: number;
}

type developerInfoOmit = Omit<IDeveloperInfo, "id" | "developerId">;
type developerInfoResult = QueryResult<developerInfoOmit>;

export {
  IDeveloper,
  developerCreate,
  developerResult,
  developerInfoResult,
  IListDeveloperRes,
};
