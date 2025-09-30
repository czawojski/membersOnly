const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

require("dotenv").config();
// console.log(process.env)

// to serve static assets:
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app for TOP inventory app - listening on port ${PORT}!`);
});