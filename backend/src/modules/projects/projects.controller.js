import * as projectsService from './projects.service.js';

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectsService.getAllProjects(req.user.id);
    res.status(200).json({ status: 'success', data: { projects } });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await projectsService.getProjectById(req.params.id, req.user.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    const project = await projectsService.createProject({
      name,
      description,
      status,
      userId: req.user.id,
    });
    res.status(201).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await projectsService.updateProject(req.params.id, req.user.id, req.body);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await projectsService.deleteProject(req.params.id, req.user.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
