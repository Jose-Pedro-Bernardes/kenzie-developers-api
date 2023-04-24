import { QueryResult } from "pg";

interface IProject {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate?: Date | null;
  developerId: number;
}
type projectPayload = Omit<IProject, "id">;
type projectResult = QueryResult<IProject>;

interface ICatchProject {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectEstimatedTime: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date | null;
  projectDeveloperId: number;
  technologyId: number;
  technologyName: string;
}
type catchProjectResult = QueryResult<ICatchProject>;

interface IUpdateProject {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate?: Date | null;
  developerId: number;
}

type updateProjectPayload = Omit<IUpdateProject, "id">;
type updateProjectPayloadResult = QueryResult<IUpdateProject>;

interface INewTech {
  technologyId: number;
  technologyName: string;
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectEstimatedTime: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date | null;
}

type newTech = QueryResult<INewTech>;

export {
  projectResult,
  projectPayload,
  ICatchProject,
  catchProjectResult,
  updateProjectPayload,
  updateProjectPayloadResult,
  newTech,
};
