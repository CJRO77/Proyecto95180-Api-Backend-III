import express from "express";
import productsRouter from "./routes/products.routes.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

export default app;