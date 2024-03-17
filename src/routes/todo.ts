import express from "express";
import {
  validateCreateJson,
  validateUpdateJson,
} from "../middleware/todos.middleware";
import * as todosController from "../controller/todos.controller";

export const todoRoute = express.Router();

// Get all todos
todoRoute.get("/", todosController.index);
// Create a new todo
todoRoute.post("/", validateCreateJson, todosController.create);
// Get a specific todo
todoRoute.get("/:id", todosController.show);
// Update a todo
todoRoute.put("/:id", validateUpdateJson, todosController.update);
// Delete a todo
todoRoute.delete("/:id", todosController.destroy);
