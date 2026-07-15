import express from "express";
const app = express();
import productsRouter from "./routes/products.js";
import getUserFromToken from "#middleware/getUserFromToken";
import ordersRouter from "./routes/orders.js";
import usersRouter from "./routes/users.js";

app.use(express.json());
app.use(getUserFromToken);

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

export default app;
