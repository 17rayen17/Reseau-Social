const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

const validationCommentContent = (obj) => {
  const schema = Joi.object({
    content: Joi.string().trim().required(),
  });

  return schema.validate(obj);
};

module.exports = {
  Comment,
  validationCommentContent,
};
