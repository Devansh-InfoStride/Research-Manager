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

export const createBookmark = async (req, res, next) => {
  try {
    const { title, url, type, rating, projectId } = req.body;
    const bookmark = await bookmarksService.createBookmark({
      title,
      url,
      type,
      rating,
      projectId,
      userId: req.user.id
    });
    res.status(201).json({ status: 'success', data: { bookmark } });
  } catch (error) {
    next(error);
  }
};
