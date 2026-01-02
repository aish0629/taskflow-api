import { addComment, getComments } from "../services/comment.service.js";

export const addCommentController = (req, res) => {
  try {
    const { taskId } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment required" });
    }

    const data = addComment({
      taskId,
      comment,
      userId: req.user.userId
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommentsController = (req, res) => {
  try {
    const comments = getComments(req.params.taskId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
