const mongoose = require("mongoose");
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

const userSchema = new Schema({
  name: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "user" },
});
const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeUser = async () => {
  const user = new User({ name: "arbor0711", age: 99 });
  //   const user = await User.findOne({ name: "arbor0711" });

  const tweet = new Tweet({
    text: "I believe Elon was sleeping all the day!",
    likes: 104,
  });

  //   const tweet = new Tweet({
  //     text: "The Iran women are the bravest people that I have ever seen.",
  //     likes: 87309,
  //   });
  tweet.user = user;
  await user.save();
  await tweet.save();
};

// makeUser();
Tweet.find({})
  .populate({ path: "user" })
  .then((t) => console.log(t));
