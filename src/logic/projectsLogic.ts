import { Response, Request, query } from "express";
import format from "pg-format";
import { client } from "../database";
import {
  catchProjectResult,
  newTech,
  projectPayload,
  projectResult,
  updateProjectPayload,
  updateProjectPayloadResult,
} from "../interface/projectsInterfaces";
import { QueryResult } from "pg";

const registerNewProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: projectPayload = req.body;

  if (typeof payload.endDate === "undefined") {
    payload.endDate = null;
  }

  const queryString: string = format(
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
  const id: number = parseInt(req.params.id);

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

  const queryResult: catchProjectResult = await client.query(queryString);
  return res.status(200).json(queryResult.rows);
};

const updatedProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const payload: updateProjectPayload = req.body;

  const queryString: string = format(
    `
  
  UPDATE projects SET(%I) = ROW(%L) WHERE id = %L RETURNING *;

  `,
    Object.keys(payload),
    Object.values(payload),
    id
  );

  const queryResult: updateProjectPayloadResult = await client.query(
    queryString
  );
  const projectUpdated = queryResult.rows[0];
  return res.status(200).json(projectUpdated);
};

const removeProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = format(
    `
  DELETE FROM projects WHERE id = %L;
  `,
    id
  );

  await client.query(queryString);
  return res.status(204).json();
};

const registerNewTech = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const techName: string = req.body.name;
  const addedIn: Date = new Date();

  const queryStringTecId: string = `
  SELECT * FROM technologies WHERE name = $1;
  `;
  const queryResultTechId = await client.query(queryStringTecId, [techName]);
  const techId = parseInt(queryResultTechId.rows[0].id);

  const tecInfo = {
    projectId: id,
    technologyId: techId,
    addedIn: addedIn,
  };

  const queryString: string = format(
    `
  
  INSERT INTO projects_technologies (%I) VALUES (%L) RETURNING *;
  
  `,
    Object.keys(tecInfo),
    Object.values(tecInfo)
  );

  await client.query(queryString);

  const queryString2: string = format(
    `

  SELECT
    tec.id "technologyId",
    tec."name" "technologyName",
    project.id "projectId",
    project."name" "projectName",
    project."description" "projectDescription",
    project."estimatedTime" "projectEstimatedTime",
    project."repository" "projectRepository",
    project."startDate" "projectStartDate",
    project."endDate" "projectEndDate"
  FROM
    technologies tec 
  LEFT JOIN 
    projects_technologies project_tec ON project_tec."technologyId" = tec.id
  LEFT JOIN 
    projects project  ON project_tec."projectId" = project.id
  WHERE project.id = %L;
 
  `,
    id
  );

  const queryResult: newTech = await client.query(queryString2);
  const newTec = queryResult.rows[0];

  return res.status(201).json(newTec);
};

const removeTech = async (req: Request, res: Response): Promise<Response> => {
  const projectId: number = parseInt(req.params.id);

  const queryStringTecId: string = format(
    `
  
  SELECT * FROM projects_technologies WHERE "projectId" = %L;
  
  `,
    projectId
  );

  const queryResultTechId = await client.query(queryStringTecId);
  const techId: number = parseInt(queryResultTechId.rows[0].technologyId);
  const queryString: string = format(
    `
  
  DELETE FROM projects_technologies
  WHERE "technologyId" = %L AND "projectId" = %L;
   
  `,
    techId,
    projectId
  );

  await client.query(queryString);

  return res.status(204).json();
};

export {
  registerNewProject,
  listProjectsById,
  updatedProject,
  removeProject,
  registerNewTech,
  removeTech,
};
