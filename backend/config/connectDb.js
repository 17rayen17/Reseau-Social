const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      User;
      Post;
      Comment;
      console.log("BD connected successfully");
    })
    .catch((error) => console.log(error));
};

module.exports = connectDB;
