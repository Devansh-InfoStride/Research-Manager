import client from './client';

export const getComparison = async (projectId = null) => {
  const url = projectId ? `/comparisons?projectId=${projectId}` : '/comparisons';
  const response = await client.get(url);
  return response.data.data;
};
