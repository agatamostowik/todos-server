import { query } from "../../postgresql.js";

export const getTodos = async (userId) => {
  const queryString = `SELECT todo.* FROM profile_todo, todo WHERE profile_todo.todo_id = todo.id AND profile_todo.user_id = ${userId};`;

  const result = await query(queryString);
  return result;
};

export const editTodo = async (todoId, column) => {
  const queryString = `UPDATE todo SET ${column} = '${column}' WHERE id = ${todoId} RETURNING *;`;

  const result = await query(queryString);

  return result;
};

export const selectTodoById = async (todoId) => {
  const queryString = `SELECT * FROM todo WHERE id = ${todoId};`;

  const result = await query(queryString);
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

  return todos[0];
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
