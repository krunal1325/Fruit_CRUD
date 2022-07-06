const mongoose = require("mongoose");

const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "fruit name required"],
  },
  quantity: {
    type: Number,
  },
  cost: {
    type: Number,
    required: true,
  },
  total_cost: {
    type: Number,
  },
});

fruitSchema.pre("save", async function (next) {
  if (this.isModified(this.total_cost)) {
    this.total_cost = this.cost * this.quantity;
  }
});

fruitSchema.pre("updateOne", function (next) {
  const data = this.getUpdate();
  data.total_cost = data.cost * data.quantity;
  next();
});

const Fruit = mongoose.model("fruit", fruitSchema);

module.exports = Fruit;
