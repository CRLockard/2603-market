import db from "#db/client";

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL
// );
// CREATE TABLE products(
//     id SERIAL PRIMARY KEY,
//     title TEXT NOT NULL,
//     description TEXT NOT NULL,
//     price DECIMAL NOT NULL
// );
// CREATE TABLE orders(
//     id SERIAL PRIMARY KEY,
//     date DATE NOT NULL,
//     note TEXT,
//     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
// );
// CREATE TABLE orders_products(
//     order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
//     product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
//     quantity INTEGER NOT NULL,
//     UNIQUE (order_id, product_id)
// );

//GET ALL ORDERS THAT CONTAIN PRODUCT X
export async function getOrdersByProductId(id) {
  const sql = `
    SELECT orders.*
    FROM orders
    JOIN orders_products ON orders_products.order_id = orders.id
    JOIN products ON products.id = orders_products.product_id
    WHERE products.id = $1
    `;

  const { rows: orders } = await db.query(sql, [id]);
  return orders;
}

//ADD NEW ORDER
export async function createOrder(date, note, userId) {
  const sql = `
    INSERT INTO orders ( date, note, user_id)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;

  const {
    rows: [order],
  } = await db.query(sql, [date, note, userId]);

  return order;
}

//GET ALL ORDERS FOR A USER
export async function getAllOrdersForUser(userId) {
  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    `;

  const { rows: orders } = await db.query(sql, [userId]);
  return orders;
}

//GET ORDER BY ID
export async function getOrdersById(id) {
  const sql = `
    SELECT *
    FROM orders
    WHERE id = $1
    `;

  const {
    rows: [order],
  } = await db.query(sql, [id]);
  return order;
}

//ADD PRODUCT TO ORDER
export async function addProductToOrder(orderId, productId, quantity) {
  const sql = `
    INSERT INTO orders_products (order_id, product_id, quantity)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;

  const {
    rows: [orderProduct],
  } = await db.query(sql, [orderId, productId, quantity]);

  return orderProduct;
}

//GET ALL PRODUCTS FROM AN ORDER
export async function getAllProductsFromOrder(orderId) {
  const sql = `
    SELECT products.*
    FROM products
    JOIN orders_products on products.id = orders_products.product_id
    WHERE orders_products.order_id = $1
    `;

  const { rows: products } = await db.query(sql, [orderId]);
  return products;
}
