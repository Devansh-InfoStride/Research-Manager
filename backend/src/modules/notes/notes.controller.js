import * as notesService from './notes.service.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    let notes;
    if (projectId) {
      notes = await notesService.getNotesByProject(req.user.id, projectId);
    } else {
      notes = await notesService.getAllNotes(req.user.id);
    }
    res.status(200).json({ status: 'success', data: { notes } });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content, projectId } = req.body;
    const note = await notesService.createNote({
      title,
      content,
      projectId,
      userId: req.user.id
    });
    res.status(201).json({ status: 'success', data: { note } });
  } catch (error) {
    next(error);
  }
};
