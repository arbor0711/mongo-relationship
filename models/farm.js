const mongoose = require("mongoose");
// destruction Schema from mongoose
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION FAILED!!!");
    console.log(err);
  });

//   defining child model -> product
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

// make model
const Product = mongoose.model("Product", productSchema);

// make a couple of products
// Product.insertMany([
//   { name: "Apple", price: 1, season: "Spring" },
//   { name: "Orange", price: 2, season: "Fall" },
//   { name: "Tomato", price: 1, season: "Summer" },
//   { name: "Potato", price: 1, season: "Winter" },
//   { name: "Cherry", price: 1, season: "Summer" },
// ]);

//   create second model-> farm model using Schema instead of mongoose.Schema
const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

// make model
const Farm = mongoose.model("Farm", farmSchema);
// make a farm
const makeFarm = async () => {
  const farm = new Farm({
    name: "Wensen Farm",
    city: "Zarghan",
  });
  const apple = await Product.findOne({ name: "Apple" });
  farm.products.push(apple);
  const res = await farm.save();
};

const addProduct = async (place, item) => {
  const farm = await Farm.findOne({ name: place });
  const product = await Product.findOne({ name: item });
  farm.products.push(product);
  const res = await farm.save();
  console.log(res);
};

// addProduct("Wensen Farm", "Potato");

Farm.findOne({ name: "Wensen Farm" })
  .populate("products")
  .then((farm) => console.log(farm));
