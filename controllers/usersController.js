// copied from usingPostgreSQL project

const db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "Form" },
  { href: "/delete", text: "Delete" },
];

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  res.render("index", { title: "Using PostgreSQL", links: links, usernames: usernames });
//   console.log("Usernames: ", usernames);
//   res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  // render the form
  res.render("form", { links: links });
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function deleteUsernameGet(req, res) {
  res.render("delete", { links: links });
}

async function deleteUsernamePost(req, res) {
  const { username } = req.body;
  await db.deleteUsername(username);
  res.redirect("/");
}

async function searchUsernameGet(req, res) {
  const username = req.query.username;
  const searchedName = await db.searchUsername(username);
  res.send(`${searchedName[0].username}`)
  // res.render("index", { title: "Using PostgreSQL", links: links, searchedName: searchedName, username: username });
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  deleteUsernameGet,
  deleteUsernamePost,
  searchUsernameGet,
};
