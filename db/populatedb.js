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


INSERT INTO items (name, quantity, price, type, creator) 
VALUES
  ('James Bond', 3, 450, 'moddy', 'bootleg'),
  ('Xarghis Khan', 1, 1350, 'moddy', 'bootleg'),
  ('Brigitte Stahlhelm', 2, 800, 'moddy', 'Honey Pilar'),
  ('Complete Guardian', 1, 1700, 'moddy', 'Laila\'),
  ('productivity', 11, 120, 'moddy', 'Laila'),
  ('Slow burn', 1, 450, 'moddy', 'Honey Pilar'),
  ('Arabic', 3, 450, 'daddy', 'Laila'),
  ('English', 2, 200, 'daddy', 'Laila'),
  ('pain tolerance', 7, 650, 'daddy', 'Laila'),
  ('unchecked rage', 1, 1000, 'daddy', 'bootleg'),
  ('sleep control', 6, 50, 'daddy', 'Laila');

INSERT INTO category (title) 
VALUES
  ('moddy'),
  ('daddy');

INSERT INTO creator (name) 
VALUES
  ('Honey Pilar'),
  ('Laila'),
  ('bootleg');
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