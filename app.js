import express from "express";
const app = express();
import productsRouter from "./routes/products.js";
import getUserFromToken from "#middleware/getUserFromToken";
import ordersRouter from "./routes/orders.js";

app.use(express.json());
app.use(getUserFromToken);

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

export default app;
