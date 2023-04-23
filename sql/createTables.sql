CREATE TABLE IF NOT EXISTS developers (
  "id"      SERIAL        NOT NULL,
  "name"    VARCHAR(50)   NOT NULL,
  "email"   VARCHAR(50)   UNIQUE NOT NULL,
  PRIMARY KEY("id")
);

CREATE TYPE "OS" AS ENUM ('Windows', 'Linux', 'MacOS');


CREATE TABLE IF NOT EXISTS developer_infos (
  "id"                          SERIAL                           NOT NULL, 
  "developerSince"              DATE                             NOT NULL,
  "preferredOS"                 "OS"                             NOT NULL,
  "developerId"                 INTEGER                          UNIQUE NOT NULL,
  FOREIGN KEY ("developerId")   REFERENCES developers(id)        ON DELETE CASCADE,
  PRIMARY KEY("id")
);


CREATE TABLE IF NOT EXISTS projects (
  "id"                SERIAL        NOT NULL,
  "name"              VARCHAR(50)   NOT NULL,
  "description"       TEXT,
  "estimatedTime"     VARCHAR(120)  NOT NULL,
  "repository"        VARCHAR(120)  NOT NULL,
  "startDate"         DATE          NOT NULL,
  "endDate"           DATE,
  "developerId"       INTEGER,
  FOREIGN KEY ("developerId") REFERENCES developers(id) ON DELETE SET NULL,
  PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS technologies (
  "id"        SERIAL        NOT NULL,
  "name"      VARCHAR(50)   NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO technologies("name")
VALUES
('JavaScript'),
('Python'),
('React'),
('Express.js'),
('HTML'),
('CSS'),
('Django'),
('PostgreSQL'),
('MongoDB');


CREATE TABLE IF NOT EXISTS projects_technologies (
  "id"              SERIAL                                    NOT NULL,
  "addedIn"         DATE                                      NOT NULL,
  "technologyId"    INTEGER                                   NOT NULL,
  "projectId"       INTEGER                                   NOT NULL,
  FOREIGN KEY ("technologyId")    REFERENCES technologies(id) ON DELETE SET NULL,
  FOREIGN KEY ("projectId")       REFERENCES projects(id)     ON DELETE CASCADE,
  PRIMARY KEY("id")
);

