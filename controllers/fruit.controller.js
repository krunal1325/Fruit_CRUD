const { ObjectId } = require("mongodb");
const Fruit = require("../models/fruit.model");

const addFruit = async (req, res) => {
  try {
    const { name, quantity, cost } = req.body;
    if (!name) {
      res.status(400).json({
        error: "Please provide valid fruit name",
      });
    }
    if (quantity === 0 && quantity < 0) {
      res.status(400).json({
        error: "Please provide valid fruit quantity",
      });
    }
    if (cost === 0 && cost < 0) {
      res.status(400).json({
        error: "Please provide valid fruit cost",
      });
    }

    const newFruit = await Fruit.create({
      name: name.toLocaleLowerCase(),
      quantity,
      cost,
    });
    res.status(201).json(newFruit);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getFruits = async (req, res) => {
  ``;
  try {
    const data = await Fruit.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getFruitById = async (req, res) => {
  try {
    const fruit = await Fruit.findOne({ _id: ObjectId(req.params.id) });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteFruitById = async (req, res) => {
  try {
    const deletedFruit = await Fruit.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).json({ message: "Fruit deleted!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateFruitById = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedFruit = await Fruit.updateOne(
      { _id: ObjectId(req.params.id) },
      { ...req.body, name: name.toLocaleLowerCase() }
    );
    res.status(200).json({ message: "Fruit updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getAvgPriceOfFruit = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      res.status(400).json({
        error: "Please provide valid fruit name",
      });
    }
    const isExists = await Fruit.findOne({ name: name.toLocaleLowerCase() });
    if (!isExists) {
      return res.status(404).json({
        message: "Fruit Not Found",
      });
    }
    const avgPrice = await Fruit.find({ name: name.toLocaleLowerCase() });
    const totalPrice = await avgPrice.reduce(
      (acc, item) => (acc += item.total_cost),
      0
    );
    const totalQuantity = await avgPrice.reduce(
      (acc, item) => (acc += item.quantity),
      0
    );
    console.log("totalPrice", totalPrice);
    console.log("totalQuantity", totalQuantity);

    return res.status(200).json({
      message: `Successfully get Average Price of one ${name}`,
      data: {
        name,
        avgPrice: totalPrice / totalQuantity,
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addFruit,
  getFruits,
  deleteFruitById,
  getFruitById,
  updateFruitById,
  getAvgPriceOfFruit,
};
