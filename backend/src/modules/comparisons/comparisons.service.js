import { sql } from '../../config/db.js';

export const getComparisonByProjectId = async (userId, projectId) => {
  const [comparison] = await sql`
    SELECT * FROM comparisons 
    WHERE user_id = ${userId} AND project_id = ${projectId}
  `;

  if (!comparison) return null;

  const fields = await sql`
    SELECT * FROM comparison_fields 
    WHERE comparison_id = ${comparison.id}
    ORDER BY "order" ASC
  `;

  const items = await sql`
    SELECT * FROM comparison_items 
    WHERE comparison_id = ${comparison.id}
    ORDER BY "order" ASC
  `;

  const values = await sql`
    SELECT * FROM comparison_values 
    WHERE comparison_id = ${comparison.id}
  `;

  return {
    ...comparison,
    fields,
    items,
    values
  };
};

export const getAllComparisons = async (userId) => {
  return await sql`
    SELECT c.*, p.name as project_name 
    FROM comparisons c
    JOIN projects p ON c.project_id = p.id
    WHERE c.user_id = ${userId}
    ORDER BY c.created_at DESC
  `;
};
