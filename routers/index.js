const express = require("express");
const fruitRouter = require("./fruit.router");
const router = express.Router();

router.use("/fruit", fruitRouter);

module.exports = router;
