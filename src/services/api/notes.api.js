import client from './client';

export const getAllNotes = async (projectId = null) => {
  const url = projectId ? `/notes?projectId=${projectId}` : '/notes';
  const response = await client.get(url);
  return response.data.data.notes;
};

export const createNote = async (data) => {
  const response = await client.post('/notes', data);
  return response.data.data.note;
};
