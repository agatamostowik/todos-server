import { query } from "../../postgresql.js";

export const getTodos = async (userId) => {
  // const queryTodos = `SELECT todo.* FROM profile_todo, todo WHERE profile_todo.todo_id = todo.id AND profile_todo.user_id = ${userId};`;
  const queryTodos = `
  SELECT todo.*, COALESCE(JSON_AGG(tag) FILTER (WHERE tag IS NOT NULL), '[]') AS tags
FROM todo
INNER JOIN profile_todo
ON profile_todo.todo_id = todo.id AND profile_todo.user_id = ${userId}
LEFT JOIN todo_tag 
ON todo.id = todo_tag.todo_id
LEFT JOIN tag
ON todo_tag.tag_id = tag.id
GROUP BY todo.id
ORDER BY todo.id ASC;
`;

  // console.log(queryTodos);
  const todos = await query(queryTodos);
  // console.log(todos);
  // const todoIds = todos.map((todo) => {
  //   return todo.id;
  // });r

  // const stringifiedTodoIds = todoIds.join(", ");
  // const queryTags = `SELECT tag.name FROM tag, todo_tag WHERE todo_tag.todo_id IN (${stringifiedTodoIds}) AND todo_tag.tag_id = tag.id ;`;
  // const tags = await query(queryTags);
  // console.log("tags:", tags);
  return todos;
};

export const editTodo = async (todoId, column, value) => {
  const queryString = `UPDATE todo SET ${column} = '${value}' WHERE id = ${todoId};`;

  const result = await query(queryString);

  return result;
};

export const selectTodoById = async (todoId) => {
  // const queryString = `SELECT *, FROM todo WHERE id = ${todoId};`;
  const queryString = `SELECT todo.*, ARRAY_REMOVE(ARRAY_AGG(tag.name), NULL) as tags
  FROM todo
  LEFT JOIN todo_tag 
  ON todo.id = todo_tag.todo_id
  LEFT JOIN tag
  ON todo_tag.tag_id = tag.id
  WHERE todo.id = ${todoId}
  GROUP BY todo.id;`;

  const result = await query(queryString);
  console.log("result:", result);
  return result[0];
};

export const deleteTodo = async (todoId) => {
  const queryString = `DELETE FROM todo WHERE id = ${todoId} OR ${todoId} = ANY("ancestorsIds") RETURNING id;`;

  const result = await query(queryString);

  return result;
};

export const addTodo = async (label, typedAncestorsIds, parentId, userId) => {
  const queryToTodoTable = `INSERT INTO todo ("label", "parentId", "ancestorsIds") VALUES ('${label}', ${parentId}, ARRAY${typedAncestorsIds}) RETURNING *;`;

  const todos = await query(queryToTodoTable);

  const todoId = todos[0].id;

  const queryToProfileTodoTable = `INSERT INTO profile_todo ("user_id", "todo_id") VALUES (${userId}, ${todoId});`;

  await query(queryToProfileTodoTable);

  const todo = await selectTodoById(todoId);
  console.log("todo:", todo);
  return todo;
};

export const getUserByEmail = async (email) => {
  const queryString = `SELECT * FROM profile WHERE email = '${email}';`;

  const result = await query(queryString);

  return result[0];
};

export const getUserById = async (id) => {
  const queryString = `SELECT * FROM profile WHERE id = '${id}';`;

  const result = await query(queryString);

  return result[0];
};

export const createUser = async (encryptedUser) => {
  const queryString = `INSERT INTO profile ("firstName", "lastName", "email", "phoneNumber", "password") VALUES ('${encryptedUser.firstName}', '${encryptedUser.lastName}', '${encryptedUser.email}', ${encryptedUser.phoneNumber}, '${encryptedUser.password}') RETURNING "firstName", "lastName", "email", "phoneNumber";`;

  const result = await query(queryString);
  return result[0];
};

export const getTags = async (userId) => {
  const queryString = `
  SELECT DISTINCT tag.*
	FROM tag
	INNER JOIN todo_tag
	ON tag.id = todo_tag.tag_id
	INNER JOIN todo
	ON todo_tag.todo_id = todo.id
	INNER JOIN profile_todo
	ON profile_todo.todo_id = todo.id AND profile_todo.user_id = ${userId}; `;

  const result = await query(queryString);
  return result;
};
