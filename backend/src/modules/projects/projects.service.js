import { sql } from '../../config/db.js';

export const getAllProjects = async (userId) => {
  return await sql`
    SELECT * FROM projects WHERE user_id = ${userId} ORDER BY created_at DESC
  `;
};

export const getProjectById = async (id, userId) => {
  const [project] = await sql`
    SELECT * FROM projects WHERE id = ${id} AND user_id = ${userId}
  `;
  return project;
};

export const createProject = async ({ name, description, status, userId }) => {
  const [project] = await sql`
    INSERT INTO projects (name, description, status, user_id)
    VALUES (${name}, ${description}, ${status}, ${userId})
    RETURNING *
  `;
  return project;
};

export const updateProject = async (id, userId, { name, description, status }) => {
  const [project] = await sql`
    UPDATE projects
    SET name = COALESCE(${name}, name),
        description = COALESCE(${description}, description),
        status = COALESCE(${status}, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;
  return project;
};

export const deleteProject = async (id, userId) => {
  return await sql`
    DELETE FROM projects WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;
};
