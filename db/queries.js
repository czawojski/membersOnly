const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function getAllModdies() {
  const { rows } = await pool.query("SELECT * FROM items WHERE type = 'moddy'");
  return rows;
}

async function getAllDaddies() {
  const { rows } = await pool.query("SELECT * FROM items WHERE type = 'daddy'");
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function deleteItem(itemDel) {
  await pool.query("DELETE FROM items WHERE name=($1)", [itemDel]);
}

async function addItemToInventory(addItem, addQuantity, addPrice, addType, addCreator) {
  const { rows } = await pool.query("INSERT INTO items (name, quantity, price, type, creator) VALUES ($1, $2, $3, $4, $5)", [addItem, addQuantity, addPrice, addType, addCreator]);
  return rows;
}

module.exports = {
  getAllItems,
  getAllModdies,
  getAllDaddies,
  getAllCategories,
  deleteItem,
  addItemToInventory
};