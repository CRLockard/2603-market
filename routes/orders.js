import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import {
  addProductToOrder,
  createOrder,
  getAllOrdersForUser,
  getAllProductsFromOrder,
  getOrdersById,
} from "#db/queries/orders";
import { getProductById } from "#db/queries/products";

const router = express.Router();

//CREATE ORDER
router.post("/", requireUser, requireBody(["date"]), async (req, res) => {
  const date = req.body.date;
  const note = req.body.note;
  const userId = req.user.id;

  const order = await createOrder(date, note, userId);

  res.status(201).send(order);
});

//GET ALL ORDERS FOR USER
router.get("/", requireUser, async (req, res) => {
  const orders = await getAllOrdersForUser(req.user.id);
  res.status(200).send(orders);
});

//GET ORDER BY ID
router.get("/:id", requireUser, async (req, res) => {
  const orderId = req.params.id;
  const order = await getOrdersById(orderId);

  if (!order) {
    res.status(404).send("No such order found");
    return;
  }

  if (order.user_id !== req.user.id) {
    res.status(403).send("You can only view your orders");
    return;
  }

  res.status(200).send(order);
});

//ADD PRODUCT TO ORDER
router.post(
  "/:id/products",
  requireUser,
  requireBody(["productId", "quantity"]),
  async (req, res) => {
    const orderId = req.params.id;
    const order = await getOrdersById(orderId);
    const product = await getProductById(req.body.productId);

    if (!order) {
      res.status(404).send("No such order found");
      return;
    }

    if (order.user_id !== req.user.id) {
      res.status(403).send("You can only modify your orders");
      return;
    }

    if (!product) {
      res.status(400).send("No such product found");
      return;
    }

    const updatedOrder = await addProductToOrder(
      orderId,
      req.body.productId,
      req.body.quantity,
    );

    res.status(201).send(updatedOrder);
  },
);

//GET ALL PRODUCTS IN AN ORDER
router.get("/:id/products", requireUser, async (req, res) => {
  const orderId = req.params.id;
  const order = await getOrdersById(orderId);

  if (!order) {
    res.status(404).send("No such order found");
    return;
  }

  if (order.user_id !== req.user.id) {
    res.status(403).send("You can only view your orders.");
    return;
  }

  const products = await getAllProductsFromOrder(orderId);
  res.status(200).send(products);
});

export default router;
