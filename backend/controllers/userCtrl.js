const {
  User,
} = require("../models/User");

/**
 * @desc get user information
 * @route /getUser/:id
 * @method GET
 * @access private
 */
module.exports.getUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    res.status(403).json({message: "you are not allowed !"})
  }
  try {
    const user = await User.findById(req.params.id).select("-password");
    if(!user){
      return res.status(400).json({message: "User not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue. Veuillez réessayer plus tard." });
  }
};
