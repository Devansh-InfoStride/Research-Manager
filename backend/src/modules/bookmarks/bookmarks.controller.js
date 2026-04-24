import * as bookmarksService from './bookmarks.service.js';

export const getAllBookmarks = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    const bookmarks = await bookmarksService.getAllBookmarks(req.user.id, projectId);
    res.status(200).json({ status: 'success', data: { bookmarks } });
  } catch (error) {
    next(error);
  }
};
