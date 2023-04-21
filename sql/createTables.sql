CREATE TABLE IF NOT EXISTS developers (
  id      SERIAL        NOT NULL,
  name    VARCHAR(50)   NOT NULL,
  email   VARCHAR(50)   UNIQUE NOT NULL,
  PRIMARY KEY(id)
);

CREATE TYPE os_type AS ENUM ('Windows', 'Linux', 'MacOS');


CREATE TABLE IF NOT EXISTS developers_info(
  id                    SERIAL                                      NOT NULL, 
  developerSince        DATE                                        NOT NULL,
  preferredOS           os_type                                     NOT NULL,
  developerId           INTEGER     REFERENCES developers(id)       UNIQUE NOT NULL,
  PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS projects (
  id                SERIAL        NOT NULL,
  name              VARCHAR(50)   NOT NULL,
  description       TEXT,
  estimatedTime     VARCHAR(120)  NOT NULL,
  repository        VARCHAR(120)  NOT NULL,
  startDate         DATE          NOT NULL,
  endDate           DATE,
  developerId       INTEGER       REFERENCES developers(id),
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS technologies (
  id        SERIAL        NOT NULL,
  name      VARCHAR(50)   NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS projects_technologies (
  id              SERIAL                                    NOT NULL,
  addedIn         DATE                                      NOT NULL,
  technologyId    INTEGER    REFERENCES technologies(id)    NOT NULL,
  projectId       INTEGER    REFERENCES projects(id)        NOT NULL,
  PRIMARY KEY(id)
);

