const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createPost,
  getAllPost,
  getPost,
  deletePost,
  updatePost,
  toggleLike,
  addComment,
  removeComment,
  updateComment,
} = require("../controllers/postCtrl");

router.post("/createPost", verifyToken, createPost);
router.get("/getAllPost", verifyToken, getAllPost);
router.get("/getPost/:id", verifyToken, getPost);
router.delete("/deletePost/:id", verifyToken, deletePost);
router.put("/updatePost/:id", verifyToken, updatePost);
router.post("/toggleLike/:id", verifyToken, toggleLike);
router
  .route("/comment/:id")
  .post(verifyToken, addComment)
  .put(verifyToken, updateComment)
  .delete(verifyToken, removeComment);

module.exports = router;
