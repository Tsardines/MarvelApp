-- to run this in terminal: $ psql -f ./database/schema.sql

DROP DATABASE IF EXISTS marvel_app;
CREATE DATABASE marvel_app;

\c marvel_app;

DROP TABLE IF EXISTS user_table CASCADE;
DROP TABLE IF EXISTS marvel_character CASCADE;
DROP TABLE IF EXISTS favorite_character CASCADE;

CREATE TABLE user_table (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255),
  password_digest VARCHAR(255)
);

CREATE TABLE marvel_character (
  -- id BIGSERIAL PRIMARY KEY,
  marvel_id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  wiki_url VARCHAR(255)
);

CREATE TABLE favorite_character (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_table(id),
  character_id INTEGER REFERENCES marvel_character(marvel_id),
  notes VARCHAR(255)
);
