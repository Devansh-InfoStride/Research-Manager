import * as bookmarksService from './bookmarks.service.js';

export const getAllBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await bookmarksService.getAllBookmarks(req.user.id);
    res.status(200).json({ status: 'success', data: { bookmarks } });
  } catch (error) {
    next(error);
  }
};
