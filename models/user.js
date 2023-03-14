const mongoose = require("mongoose");

// connect to database
mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Mongo Connection Open!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!");
    console.log(err);
  });

// define schema for user
const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  address: [
    {
      _id: { _id: false },
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        required: true,
      },
    },
  ],
});

// make model user
const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Tom",
    last: "Keshi",
  });
  u.address.push({
    street: "123 Galvanistraat",
    city: "Den Haag",
    state: "North Holland",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

const addAddress = async (id) => {
  const u = await User.findById(id);
  u.address.push({
    street: "13 faz",
    city: "Ray",
    state: "Fars",
    country: "Iran",
  });
  const res = await u.save();
};

addAddress("6410a6b12ccba4269a260d28");
