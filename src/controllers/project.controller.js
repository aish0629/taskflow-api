import { createProject, listProjects } from "../services/project.service.js";

export const createProjectController = (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Project name required" });

    const project = createProject({
      name,
      createdBy: req.user.userId
    });

    res.status(201).json({success: true,
      data: project});
  } catch (err) {
    res.status(500).json({ success: false,
      data: null ,error: err.message });
  }
};

export const listProjectsController = (req, res) => {
  try {
    const projects = listProjects();
    res.json({success: true,
      data: projects});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
