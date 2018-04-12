\c marvel_app;
INSERT INTO user (username, password_digest)
VALUES ('ewok', 'password');

INSERT INTO favorite_character (user_id, character_id, notes )
VALUES (1, 1, 'This is an awesome superhero!')

INSERT INTO marvel_character (marvel_id, name, description, image_url, series, wiki_url)
VALUES (1009146, 'Abomination (Emil Blonsky)', 'Formerly known as Emil Blonsky, a spy of Soviet Yugoslavian origin working for the KGB, the Abomination gained his powers after receiving a dose of gamma radiation similar to that which transformed Bruce Banner into the incredible Hulk.', 'http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04.jpg', 'Avengers (1998) #62', 'http://marvel.com/universe/Abomination?utm_campaign=apiRef&utm_source=c595c1f12b2db2191ce42b2a9360ba56')
