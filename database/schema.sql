DROP DATABASE IF EXISTS marvel_app;
CREATE DATABASE marvel_app;
\c marvel_app;
CREATE TABLE user (
  id BIGSERIAL PRIMARY KEY, username VARCHAR (255), password_digest VARCHAR (255)
);
CREATE TABLE favorite_character (
  id BIGSERIAL PRIMARY KEY, user_id INTEGER REFERENCES user(id), character_id INTEGER REFERENCES marvel_character(id), notes VARCHAR(255)
);
CREATE TABLE marvel_character (
  id BIGSERIAL PRIMARY KEY, marvel_id INTEGER, name VARCHAR(255), description VARCHAR(255), image_url VARCHAR(255), series VARCHAR(255), wiki_url VARCHAR(255)
)
