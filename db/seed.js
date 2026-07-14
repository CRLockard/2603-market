import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query(`
  INSERT INTO users (username, password)
  VALUES
  ('Drakcol', 'T0pS3cr3tP@$$w0rd')
  `);
  await db.query(`
  INSERT INTO products (title, description, price)
  VALUES
  ('Thing1','Description of thing1',1.99),
  ('Thing2','Description of thing2',2.99),
  ('Thing3','Description of thing3',3.99),
  ('Thing4','Description of thing4',4.99),
  ('Thing5','Description of thing5',5.99),
  ('Thing6','Description of thing6',6.99),
  ('Thing7','Description of thing7',7.99),
  ('Thing8','Description of thing8',8.99),
  ('Thing9','Description of thing9',9.99),
  ('Thing10','Description of thing10',10.99)
  `);
  await db.query(`
  INSERT INTO orders (date, note, user_id)
  VALUES
  ('2026-07-13','Description of the order',1)
  `);
  await db.query(`
  INSERT INTO orders_products(order_id, product_id, quantity)
  VALUES
  (1,4,22),
  (1,8,7),
  (1,6,5),
  (1,3,13),
  (1,10,38)
  `);
}
