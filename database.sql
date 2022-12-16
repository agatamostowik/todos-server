-- PROFILE TABLE
CREATE TABLE profile (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text,
    password text NOT NULL
);

-- PROFILE_TODO TABLE
CREATE TABLE profile_todo (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
    todo_id integer NOT NULL REFERENCES todo(id) ON DELETE CASCADE
);

-- TAG TABLE
CREATE TABLE tag (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL
);

-- TODO TABLE
CREATE TABLE todo (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL,
    "parentId" integer,
    "ancestorsIds" integer[] NOT NULL,
    status text NOT NULL DEFAULT 'new'::text
);

-- TODO_TAG TABLE
CREATE TABLE todo_tag (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    todo_id integer NOT NULL REFERENCES todo(id) ON DELETE CASCADE,
    tag_id integer REFERENCES tag(id) ON DELETE CASCADE
);







-- TEST QUERIES --
INSERT INTO users ("firstName", "lastName", "email", "phoneNumber", "password") VALUES ('Jola', 'Lojalna', 'jola@wp.pl', '123', 'hfgf');

DROP TABLE users;

SELECT todo.*
FROM profile_todo INNER JOIN todo
ON profile_todo.todo_id = todo.id;

SELECT todo.*
FROM profile_todo, todo
WHERE profile_todo.todo_id = todo.id AND profile_todo.user_id = 5;
	
SELECT todo.* FROM profile_todo, todo WHERE profile_todo.todo_id = todo.id AND profile_todo.user_id = 7;
SELECT todo.* FROM todo JOIN profile_todo ON profile_todo.todo_id = todo.id AND profile_todo.user_id = 7;


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
SELECT todo.*, ARRAY_REMOVE(ARRAY_AGG(tag.name), NULL) as tags
FROM todo
INNER JOIN profile_todo
ON profile_todo.todo_id = todo.id AND profile_todo.user_id = 7
LEFT JOIN todo_tag 
ON todo.id = todo_tag.todo_id
LEFT JOIN tag
ON todo_tag.tag_id = tag.id
GROUP BY todo.id;

SELECT todo.*, ARRAY_REMOVE(ARRAY_AGG(tag.name), NULL) as tags
FROM todo
LEFT JOIN todo_tag 
ON todo.id = todo_tag.todo_id
LEFT JOIN tag
ON todo_tag.tag_id = tag.id
WHERE todo.id = 89
GROUP BY todo.id;

-- TO SAMO CO WYŻEJ ALE ZWRACA TAGS JAKO ARRAY OBIEKTÓW
SELECT todo.*, COALESCE(JSON_AGG(tag) FILTER (WHERE tag IS NOT NULL), '[]') AS tags
FROM todo
LEFT JOIN todo_tag 
ON todo.id = todo_tag.todo_id
LEFT JOIN tag
ON todo_tag.tag_id = tag.id
WHERE todo.id = 94
GROUP BY todo.id;

DELETE profile_todo, todo, todo_tag, tag
FROM profile_todo
INNER JOIN todo 
ON profile_todo.todo_id = todo.id
INNER JOIN todo_tag 
ON  todo_tag.todo_id = todo.id
INNER JOIN tag
ON todo_tag.tag_id = tag.id
WHERE todo.id = 86;

DELETE 
FROM todo
WHERE id = 86;

SELECT DISTINCT tag.*
FROM tag
INNER JOIN todo_tag
ON tag.id = todo_tag.tag_id
INNER JOIN todo
ON todo_tag.todo_id = todo.id
INNER JOIN profile_todo
ON profile_todo.todo_id = todo.id AND profile_todo.user_id = 7; 



