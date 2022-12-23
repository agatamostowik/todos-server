import { editTodo, selectTodoById } from "../models/index.js";

export const editTodoController = async (req, res) => {
  const todoId = req.params.todoId;
  const label = req.body.label;
  const status = req.body.status;
  const addedTags = req.body.addedTags;
  const removedTags = req.body.removedTags;

  res.status(200);

  const addedExistingTags =
    addedTags && addedTags.filter((tag) => tag.id !== "new_tag");
  const addedNewTags =
    addedTags && addedTags.filter((tag) => tag.id === "new_tag");

  await editTodo(
    todoId,
    addedExistingTags,
    addedNewTags,
    removedTags,
    label,
    status
  );

  const todo = await selectTodoById(todoId);

  res.json(todo);
  // removedTags
  // 1. usun wiersz z todo_tag gdy tag_id jest rowny removedTag.id
  // 2. jesli usuniety removedTag.id był ostatnim w kolumnie usun tag o tym id z tabeli tag

  // delete *** WHERE (SELECT * FROM todo_tag WHERE ${:REMOED_ID} = todo_tag.id)

  // addedTags.reduce(() => {}, [[], []])

  // await editTodo(label, status, tags)

  // 1. { status: "in_progress" }
  // 2. { status: "in_progress", tags: [], label: "OK" }

  // POST
  // [
  //   { id: 1, name: "foo" },
  //   { id: 2, name: "bar" },
  //   { id: "new_tag", name: "cis" },
  // ]

  // [({ id: 1, name: "foo" }, { id: 2, name: "bar" }, { id: 3, name: "fiz" })];

  // try {
  //   if (status) {
  //     console.log("Starting sending query for status column with:", status);
  //     await editTodo(todoId, "status", status);
  //   }

  //   if (label) {
  //     console.log("Starting sending query for label column with:", label);
  //     await editTodo(todoId, "label", label);
  //   }

  //   const result = await selectTodoById(todoId);

  //   res.json(result);
  // } catch (error) {
  //   console.log("ERROR:", error);
  // }
};
