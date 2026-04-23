import bcrypt from 'bcryptjs';
import { sql } from '../../config/db.js';

export const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [user] = await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword})
    RETURNING id, name, email, created_at
  `;
  return user;
};

export const findUserByEmail = async (email) => {
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return user;
};

export const findUserById = async (id) => {
  const [user] = await sql`
    SELECT id, name, email, created_at FROM users WHERE id = ${id}
  `;
  return user;
};
