import client from './client';

export const getAllBookmarks = async (projectId = null) => {
  const url = projectId ? `/bookmarks?projectId=${projectId}` : '/bookmarks';
  const response = await client.get(url);
  return response.data.data.bookmarks;
};

export const createBookmark = async (data) => {
  const response = await client.post('/bookmarks', data);
  return response.data.data.bookmark;
};
