import { sql } from '../../config/db.js';

export const getAllNotes = async (userId) => {
  return await sql`
    SELECT n.*, p.name as project_name 
    FROM notes n
    LEFT JOIN projects p ON n.project_id = p.id
    WHERE n.user_id = ${userId}
    ORDER BY n.updated_at DESC
  `;
};

export const getNotesByProject = async (userId, projectId) => {
  return await sql`
    SELECT * FROM notes 
    WHERE user_id = ${userId} AND project_id = ${projectId}
    ORDER BY updated_at DESC
  `;
};

export const createNote = async ({ title, content, projectId, userId }) => {
  const [note] = await sql`
    INSERT INTO notes (title, content, project_id, user_id)
    VALUES (${title}, ${content}, ${projectId}, ${userId})
    RETURNING *
  `;
  return note;
};
