const { Router } = require("express");
const usersController = require("../controllers/usersController");
const indexRouter = Router();

// indexRouter.get("/", usersController.getCategories);

indexRouter.get('/', (req, res) => {
  res.send('Hello, world!')
})

// BELOW will throw errors until the functions are created:

// indexRouter.post("/", usersController.addItemPost);

// indexRouter.get("/moddy", usersController.getModdies);

// indexRouter.get("/daddy", usersController.getDaddies);

// indexRouter.get("/delete", usersController.deleteItemGet);

// indexRouter.post("/delete", usersController.deleteItemPost);

module.exports = indexRouter;