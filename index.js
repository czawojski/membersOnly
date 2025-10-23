const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const app = express();

require("dotenv").config();
// console.log(process.env)

const pool = new Pool({
  host: "localhost",
  user: "czawojski",
  database: "clubhouse",
  port: 5432
});

const links = [
  { href: "/", text: "Home" },
  { href: "/sign-up", text: "Sign Up" },
  { href: "/post", text: "Post" },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// needs to be below:  const app = express();
// to serve static assets:
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

app.get("/", async (req, res) => {
  const messages = await getAllMessages();
  res.render("index", { title: "Members Only", user: req.user, links: links, messages: messages });
});


// 10-16 replaced with above: app.get("/", (req, res) => {
//   res.render("index", { user: req.user, links: links });
// });

// 10-2: temporarily replaced above to test connection
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/sign-up", (req, res) => res.render("sign-up-form", {links: links}));

app.post("/sign-up", async (req, res, next) => {
 try {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await pool.query("INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)", [req.body.fullname, req.body.username, hashedPassword]);
  res.redirect("/");
 } catch (error) {
    console.error(error);
    next(error);
   }
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

// 10-13-25
app.get("/post", (req, res) => {
  res.render("post", { user: req.user, links: links });
});

// 10-13-25
app.post("/post", async (req, res, next) => {
 try {
  await pool.query("INSERT INTO messages (username, title, body) VALUES ($1, $2, $3)", [req.body.username, req.body.title, req.body.message]);
  res.redirect("/");
 } catch (error) {
    console.error(error);
    next(error);
   }
});

// 10-20-25
app.post("/delete/:id", async (req, res, next) => {
  try {
  await pool.query("DELETE FROM messages WHERE id = $1", [req.params.id]);
  console.log(req.params.id);
  res.redirect("/");
 } catch (error) {
    console.error(error);
    next(error);
   }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      const match = await bcrypt.compare(password, user.password);
      
      if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app for TOP members only app - listening on port ${PORT}!`);
});