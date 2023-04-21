CREATE TABLE IF NOT EXISTS developers (
  id      SERIAL        NOT NULL,
  name    VARCHAR(50)   NOT NULL,
  email   VARCHAR(50)   UNIQUE NOT NULL,
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