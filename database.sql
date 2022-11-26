-- Table Definition ----------------------------------------------

CREATE TABLE lista (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL,
    "parentId" integer,
    "ancestorsIds" integer[] NOT NULL
);

insert into lista ("label", "parentId", "ancestorsIds")
values ('Books', null, ARRAY[]::integer[]);

insert into lista ("label", "parentId", "ancestorsIds")
values ('Programming', 1, ARRAY[1]);

insert into lista ("label", "parentId", "ancestorsIds")
values ('Languages', 2, ARRAY[1, 2]);

insert into lista ("label", "parentId", "ancestorsIds")
values ('Databases', 2, ARRAY[1, 2]);

insert into lista ("label", "parentId", "ancestorsIds")
values ('MongoDB', 4, ARRAY[1, 2, 4]);

insert into lista ("label", "parentId", "ancestorsIds")
values ('DBM', 4, ARRAY[1, 2, 4]);

UPDATE lista SET label = 'bambo' WHERE id = 6;

-- ZNAJDZ WSZYSTKIE ENCJE KTÓRE W KOLUMNIE ancestorsIds ZAWIERAJĄ PODANY NUMER
SELECT * FROM lista WHERE 4 = ANY("ancestorsIds");


---- Indices -------------------------------------------------------
--
--CREATE UNIQUE INDEX todos_pkey ON lista(id int4_ops);


CREATE TABLE users (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "email" text NOT NULL,
    "phoneNumber" text,
    "password" text NOT NULL
);


DROP TABLE users;



INSERT INTO users ("firstName", "lastName", "email", "phoneNumber", "password") VALUES ('Jola', 'Lojalna', 'jola@wp.pl', '123', 'hfgf');



SELECT * FROM profile WHERE email = 'kochamapawelka@wp.pl';

CREATE TABLE profile_todo (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"user_id" integer NOT NULL,
	"todo_id" integer NOT NULL
);

DROP TABLE profile_todo;

INSERT INTO profile_todo ("user_id", "todo_id") VALUES (7, 62);


SELECT todo.*
FROM profile_todo INNER JOIN todo
ON profile_todo.todo_id = todo.id;

SELECT todo.*
FROM profile_todo, todo
WHERE profile_todo.todo_id = todo.id AND profile_todo.user_id = 5;

CREATE TABLE tag (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE todo_tag (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"todo_id" integer NOT NULL REFERENCES todo(id)
	);
	
	
	
SELECT todo.* FROM profile_todo, todo WHERE profile_todo.todo_id = todo.id AND profile_todo.user_id = 7;
SELECT todo.* FROM todo JOIN profile_todo ON profile_todo.todo_id = todo.id AND profile_todo.user_id = 7;


--ARRAY(SELECT  FROM todo_tag)

-- select user's todos and assign it to "todos" variable.
WITH todos AS (
	SELECT todo.*
	FROM todo JOIN profile_todo 
	ON profile_todo.todo_id = todo.id AND profile_todo.user_id = 7
)

SELECT todo_tag.* 
	FROM todo_tag JOIN todos
	ON todo_tag.todo_id = todos.id;



--WITH todo_tags AS (
--	ARRAY(
--		SELECT tag.name 
--		FROM todo_tag, user_todos, tag 
--		WHERE user_todos.id = todo_tag.todo_id AND tag.id = todo_tag.tag_id
--	)
--)
--
--SELECT todo.*, todo_tags FROM todo JOIN profile_todo ON profile_todo.todo_id = todo.id AND profile_todo.user_id = 7;


SELECT todo.*, ARRAY_AGG(tag.name) as tags
FROM todo
INNER JOIN profile_todo
ON profile_todo.todo_id = todo.id AND profile_todo.user_id = 7
LEFT JOIN todo_tag 
ON todo.id = todo_tag.todo_id
LEFT JOIN tag
ON todo_tag.tag_id = tag.id
GROUP BY todo.id;
