import { sql } from '../../config/db.js';

export const getAllBookmarks = async (userId, projectId = null) => {
  if (projectId) {
    return await sql`
      SELECT b.*, p.name as project_name 
      FROM bookmarks b
      LEFT JOIN projects p ON b.project_id = p.id
      WHERE b.user_id = ${userId} AND b.project_id = ${projectId}
      ORDER BY b.created_at DESC
    `;
  }
  return await sql`
    SELECT b.*, p.name as project_name 
    FROM bookmarks b
    LEFT JOIN projects p ON b.project_id = p.id
    WHERE b.user_id = ${userId}
    ORDER BY b.created_at DESC
  `;
};
