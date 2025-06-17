const Comment = require("../models/comment.model");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = new Comment({ userId, text });
    await comment.save();

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("userId", "name email");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });  
    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own comment" });
    }

    comment.text = text || comment.text;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comment" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
};
