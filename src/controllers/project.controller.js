import { createProject, listProjects } from "../services/project.service.js";

export const createProjectController = (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Project name required" });

    const project = createProject({
      name,
      createdBy: req.user.userId
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listProjectsController = (req, res) => {
  try {
    const projects = listProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
