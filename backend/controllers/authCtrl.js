const {
  User,
  validationLoginUser,
  validationRegisterUser,
} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc Register new user
 * @route /auth/register
 * @method POST
 * @access public
 */
module.exports.registerUser = async (req, res) => {
  try {
    const { error } = validationRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Checking if email or username already exists
    let user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (user) {
      if (user.email === req.body.email) {
        return res.status(400).json({
          message: "Cet email est déjà utilisé. Veuillez en essayer un autre.",
        });
      } else if (user.username === req.body.username) {
        return res.status(400).json({
          message:
            "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    await user.save();

    const { password, ...other } = user._doc;
    return res.status(200).json({ ...other });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
  }
};

/**
 * @desc Login user
 * @route /auth/login
 * @method POST
 * @access public
 */
module.exports.login = async (req, res) => {
  try {
    const { error } = validationLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Email or password Invalid" });
    }
    isPassworMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPassworMatch) {
      return res.status(400).json({ message: "Email or password Invalid" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const { password, ...other } = user._doc;
    return res.status(200).json({ user: { ...other }, token });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
  }
};
