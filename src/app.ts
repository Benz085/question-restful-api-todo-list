import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Router
import { todoRoute } from "./routes/todo";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route
app.use("/api/todos", todoRoute);

export default app;