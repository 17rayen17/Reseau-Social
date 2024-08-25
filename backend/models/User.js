const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
      require: true,
      maxlength: 35,
    },
    password: {
      type: String,
      trim: true,
      require: true,
      minlength: 6,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// validation register
const validationRegisterUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    username: Joi.string().trim().max(35).required(),
    password: Joi.string().trim().min(6).max(255).required(),
  });
  return schema.validate(obj);
};

// validation login
const validationLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).max(255).required(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  validationRegisterUser,
  validationLoginUser,
};
