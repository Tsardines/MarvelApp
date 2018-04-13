-- to run this in terminal: $ psql -f ./database/seed.sql

\c marvel_app;

INSERT INTO user_table (username, password_digest)
VALUES ('ewok', '$2a$10$7BfZk7868jGqY5fXtZrZ1egYJtOH/rMt8jHT4vHrL8nvTmSqf0mqy'); --this is just the hashed version of "password"

INSERT INTO marvel_character (marvel_id, name, description, image_url, wiki_url)
VALUES (1009146, 'Abomination (Emil Blonsky)', 'Formerly known as Emil Blonsky, a spy of Soviet Yugoslavian origin working for the KGB, the Abomination gained his powers after receiving a dose of gamma radiation similar to that which transformed Bruce Banner into the incredible Hulk.', 'http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04.jpg', 'http://marvel.com/universe/Abomination?utm_campaign=apiRef&utm_source=c595c1f12b2db2191ce42b2a9360ba56');

INSERT INTO favorite_character (user_id, character_id, notes )
VALUES (1, 1009146, 'This is an awesome superhero!');
