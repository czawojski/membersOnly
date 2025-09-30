// the necessary connection information:

const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL
});

// 8-28-25 changed to connectionString from:
  // host: process.env.PGHOST, // "postgres.railway.internal",
  // user: process.env.PGUSER, // "postgres",
  // database: process.env.PGDATABASE, // "railway",
  // password: process.env.PGPASSWORD, // "fwcgKctjLrornqIEYxShWgCVvJfXwTEh",
  // port: process.env.PORT // The default port

  // WORKS
  // host: process.env.HOST, // or wherever the db is hosted
  // user: process.env.USER,
  // database: "top_users",
  // password: process.env.PASSWORD,
  // port: process.env.PORT // The default port

  // WORKS
  // host: "localhost", // or wherever the db is hosted
  // user: "czawojski",
  // database: "top_users",
  // password: "1234",
  // port: 5432 // The default port

  // module.exports = new Pool({
//   host: process.env.HOST, // or wherever the db is hosted
//   user: process.env.USER,
//   // database: process.env.DATABASE, // not working 9-8-25
//   database: "inventory", // 9-8-25 this works, but not environment variable
//   // password: process.env.PASSWORD, // 9-8-25 IS THIS NEEDED?
//   port: process.env.PORT // The default port
// });