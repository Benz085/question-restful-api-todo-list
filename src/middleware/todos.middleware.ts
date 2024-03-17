import { NextFunction, Request, Response } from "express";

// Middleware to validate JSON request
export function validateCreateJson(req: Request, res: Response, next: NextFunction) {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  next();
}

export function validateUpdateJson(req: Request, res: Response, next: NextFunction) {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  if (!completed) {
    return res.status(400).json({ error: "completed is required" });
  }
  next();
}
