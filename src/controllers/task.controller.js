import {
  createTask,
  listTasksByProject,
  updateTaskStatus,
  getTaskById
} from "../services/task.service.js";

export const createTaskController = (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const task = createTask({
      title,
      description,
      projectId,
      assignedTo,
      createdBy: req.user.userId
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listTasksController = (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = listTasksByProject(projectId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatusController = (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const allowed = ["TODO", "IN_PROGRESS", "DONE"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    let task = getTaskById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task = updateTaskStatus(taskId, status);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
