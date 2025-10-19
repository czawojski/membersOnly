#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullname VARCHAR ( 255 ),
  username VARCHAR ( 255 ) UNIQUE,
  password VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 80 ), 
  body VARCHAR ( 140 ),
  posted TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  username VARCHAR ( 255 ) REFERENCES users(username)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    // "postgresql://czawojski:1234@localhost:3000/inventory"
    connectionString: "postgresql://czawojski@localhost/clubhouse",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();