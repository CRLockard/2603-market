import express from "express";
import { getProducts, getProductById } from "#db/queries/products";
import requireUser from "#middleware/requireUser";
import { getOrdersByProductId } from "#db/queries/orders";

const router = express.Router();

//GET ALL PRODUCTS ROUTE
router.get("/", async (req, res) => {
  const products = await getProducts();

  res.status(200).send(products);
});

//GET ALL ORDER THAT CONTAIN SPECIFIC PRODUCT
router.get("/:id/orders", requireUser, async (req, res) => {
  const product = await getProductById(req.params.id);

  if (!product) {
    res.status(404).send("No product found");
    return;
  }

  const orders = await getOrdersByProductId(req.params.id);

  res.status(200).send(orders);
});

//GET PRODUCT BY ID ROUTE
router.get("/:id", async (req, res) => {
  const product = await getProductById(req.params.id);

  if (!product) {
    res.status(404).send("No product found");
    return;
  }

  res.status(200).send(product);
});

export default router;
