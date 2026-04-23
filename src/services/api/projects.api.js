import client from './client';

export const getProjects = async () => {
  const response = await client.get('/projects');
  return response.data;
};

export const getProject = async (id) => {
  const response = await client.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await client.post('/projects', data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await client.patch(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await client.delete(`/projects/${id}`);
  return response.data;
};
