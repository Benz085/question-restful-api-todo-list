import { Response, Request, NextFunction } from "express";
import fs from "fs";
import generateUid from "../utils/generateUid";

import { Todo } from "types/Todo";

const DB_FILE = "todos.json";
let todos: Todo[] = [];

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, "[]", "utf8");
}


try {
  const data = fs.readFileSync(DB_FILE, "utf8");
  todos = JSON.parse(data);
} catch (err) {
  console.error("Error reading todos from file:", err);
}

function saveTodos() {
  fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2), "utf8");
}

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(todos).status(200);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const id = generateUid();
  const completed: boolean = false;
  const newTodo: Todo = { id, title, completed };
  todos.push(newTodo);
  saveTodos();
  res.status(201).json(newTodo);
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    res.status(404).send("Todo not found");
  } else {
    res.json(todo);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
  } else {
    todos[todoIndex] = { ...todos[todoIndex], title, completed };
    saveTodos();
    res.json(todos[todoIndex]);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
  } else {
    todos.splice(todoIndex, 1);
    saveTodos();
    res.sendStatus(204);
  }
};
