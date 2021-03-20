/* eslint-disable linebreak-style */
const router = require("express").Router();
const cardsRouter = require("./cards");
const usersRouter = require("./users");

router.use("/", usersRouter);
router.use("/cards", cardsRouter);
router.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

module.exports = router;
