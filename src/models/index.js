import { query } from "../../postgresql.js";

export const getTodos = async () => {
  const queryString = `SELECT * FROM lista;`;

  const result = await query(queryString);
  return result;
};

export const editTodo = async (todoId, column) => {
  const queryString = `UPDATE lista SET ${column} = '${column}' WHERE id = ${todoId} RETURNING *;`;

  const result = await query(queryString);

  return result;
};

export const selectTodoById = async (todoId) => {
  const queryString = `SELECT * FROM lista WHERE id = ${todoId};`;

  const result = await query(queryString);
  return result[0];
};

export const deleteTodo = async (todoId) => {
  const queryString = `DELETE FROM lista WHERE id = ${todoId} OR ${todoId} = ANY("ancestorsIds") RETURNING id;`;
  const result = await query(queryString);

  return result;
};

export const addTodo = async (label, typedAncestorsIds, parentId) => {
  const queryString = `INSERT INTO lista ("label", "parentId", "ancestorsIds") VALUES ('${label}', ${parentId}, ARRAY${typedAncestorsIds}) RETURNING *;`;

  const result = await query(queryString);

  return result[0];
};
