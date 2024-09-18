import Project from "../models/project.model.js";
import mongoose from "mongoose";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log("Error in fetching projects:", error.message);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const createProject = async (req, res) => {
  // res.send("Server is ready!");
  const project = req.body; // user will send this data

  if (!project.name || !project.url_live) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide fields of name or url_live.",
      });
  }

  const newProject = new Project(project);

  try {
    await newProject.save();
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.error("Error in create project:", error.message);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;

  const project = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Project Id!" });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, project, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Project Id." });
  }

  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Project deleted." });
  } catch (error) {
    console.log("Error in deleting project:", error.message);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};
