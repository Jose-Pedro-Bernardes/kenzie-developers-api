import { Response, Request } from "express";
import format from "pg-format";
import { client } from "../database";
import { IProject, projectResult } from "../interface/projectsInterfaces";

const registerNewProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: IProject = req.body;

  if (typeof payload.endDate === "undefined") {
    payload.endDate = null;
  }

  const queryString = format(
    `
  
  INSERT INTO projects(%I)
  VALUES (%L)
  RETURNING *;
  
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: projectResult = await client.query(queryString);
  const project = queryResult.rows[0];

  return res.status(201).json(project);
};

const listProjectsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  const queryString: string = format(
    `
    SELECT 
      project.id "projectId",
      project.name "projectName",
      project.description "projectDescription",
      project."estimatedTime" "projectEstimatedTime",
      project.repository "projectRepository",
      project."startDate" "projectStartDate",
      project."endDate" "projectEndDate",
      project."developerId" "projectDeveloperId",
      project_tec."technologyId",
      tec.name "technologyName"
    FROM 
      projects project
      LEFT JOIN projects_technologies project_tec ON project.id = project_tec."projectId"
      LEFT JOIN technologies tec ON project_tec."technologyId" = tec.id
    WHERE 
      project.id = %L;
  `,
    id
  );

  const queryResult = await client.query(queryString);
  return res.status(200).json(queryResult.rows);
};

export { registerNewProject, listProjectsById };
