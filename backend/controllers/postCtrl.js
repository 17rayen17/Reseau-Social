const { Post, validationPostContent } = require("../models/Post");
const { Comment, validationCommentContent } = require("../models/Comment");

/**
 * @desc create post
 * @route /post/createPost
 * @method POST
 * @access private
 */
module.exports.createPost = async (req, res) => {
  try {
    const { error } = validationPostContent(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (req.user.id !== req.body.user) {
      return res.status(400).json({ message: "you are not allowed !" });
    }
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    });
  }
};

/**
 * @desc get all post
 * @route /post/getAllPost
 * @method GET
 * @access private
 */
module.exports.getAllPost = async (req, res) => {
  try {
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });
    if (!post) {
      return res.status(404).json({ message: "No posts found." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    });
  }
};

/**
 * @desc get post by specif id
 * @route /post/getPost/:id
 * @method GET
 * @access private
 */
module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    });
  }
};

/**
 * @desc get post by specif id
 * @route /post/deletePost/:id
 * @method DELETE
 * @access private
 */
module.exports.deletePost = async (req, res) => {
  try {
    const postExist = await Post.findById(req.params.id);
    if (!postExist) {
      return res.status(404).json({ message: "post not found" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "delete post successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    });
  }
};

/**
 * @desc get post by specif id
 * @route /post/updatePost/:id
 * @method PUT
 * @access private
 */
module.exports.updatePost = async (req, res) => {
  try {
    const postExist = await Post.findById(req.params.id);
    if (!postExist) {
      return res.status(404).json({ message: "post not found" });
    }
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "post update successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    });
  }
};

/**
 * @desc get post by specif id
 * @route /post/toggleLike/:id
 * @method post
 * @access private
 */
module.exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIndex = post.likes.indexOf(req.body.userId);
    if (userIndex === -1) {
      post.likes.push(req.body.userId);
    } else {
      post.likes.splice(userIndex, 1);
    }

    const updatedPost = await post.save();
    res.status(200).json({ message: "Like toggled", post: updatedPost });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({
      message: "An error occurred. Please try again later.",
    });
  }
};

/**
 * @desc add comment to specif post
 * @route /post/comment/:id
 * @method POST
 * @access private
 */
module.exports.addComment = async (req, res) => {
  try {
    const postExist = await Post.findById(req.params.id);
    if (!postExist) {
      return res
        .status(404)
        .json({ message: "post not found", success: false });
    }
    const { error } = validationCommentContent({ content: req.body.content });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const comment = await Comment.create({
      postId: req.params.id,
      user: req.body.userId,
      content: req.body.content,
    });
    res.status(200).json({ message: "liked", comment, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      success: false,
    });
  }
};

/**
 * @desc updated comment to specif post
 * @route /post/comment/:id
 * @method PUT
 * @access private
 */
module.exports.updateComment = async (req, res) => {
  try {
    const commentExist = await Comment.findById(req.params.id);
    if (!commentExist) {
      return res
        .status(404)
        .json({ message: "comment not found", success: false });
    }
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json({
      message: "comment removed successfully",
      comment,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      success: false,
    });
  }
};

/**
 * @desc remove comment to specif post
 * @route /post/comment/:id
 * @method DELETE
 * @access private
 */
module.exports.removeComment = async (req, res) => {
  try {
    const commentExist = await Comment.findById(req.params.id);
    if (!commentExist) {
      return res
        .status(404)
        .json({ message: "comment not found", success: false });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "comment removed successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      success: false,
    });
  }
};
