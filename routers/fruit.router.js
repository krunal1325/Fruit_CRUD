const express = require("express");
const router = express.Router();
const fruitController = require("../controllers/fruit.controller");

router.get("/avg", fruitController.getAvgPriceOfFruit);
router.get("/", fruitController.getFruits);
router.get("/:id", fruitController.getFruitById);
router.post("/add", fruitController.addFruit);
router.put("/:id", fruitController.updateFruitById);
router.delete("/:id", fruitController.deleteFruitById);

module.exports = router;
