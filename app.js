import express from "express";
const app = express();
import productsRouter from "./routes/products.js";
import getUserFromToken from "#middleware/getUserFromToken";

app.use(express.json());
app.use(getUserFromToken);

app.use("/products", productsRouter);

export default app;
