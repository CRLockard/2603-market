import db from "#db/client";

//GET ALL PRODUCTS
export async function getProducts() {
  const sql = `
    SELECT *
    FROM products
    `;

  const { rows: products } = await db.query(sql);
  return products;
}
//GET ALL PRODUCTS BASED ON ID
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
