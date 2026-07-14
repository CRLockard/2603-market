import db from "#db/client";

export async function getProducts() {
  const sql = `
    SELECT *
    FROM products
    `;

  const { rows: products } = await db.query(sql);
  return products;
}

export async function getProductById(id) {
  const sql = `
    SELECT *
    FROM products
    WHERE id = $1
    `;

  const {
    rows: [product],
  } = await db.query(sql, [id]);
  return product;
}

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
