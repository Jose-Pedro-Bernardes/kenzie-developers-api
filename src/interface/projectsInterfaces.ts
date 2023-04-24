import { QueryResult } from "pg";

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

export { IProject, projectResult };
