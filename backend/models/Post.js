const mongoose = require("mongoose");
const Joi = require('joi');

const postSchema = new mongoose.Schema(
  {
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

const Post = mongoose.model('Post', postSchema);

const validationPostContent = (obj)=>{
  const schema = Joi.object({
    user: Joi.string().required(),
    content: Joi.string().trim().required(),
  });

  return schema.validate(obj);
}

module.exports = {
  Post,
  validationPostContent,
}
