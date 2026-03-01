import { query } from '../config/db.js';

export interface User {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  profile_pic?: string;
  created_at?: Date;
}

export const userModel = {
  getAllUsers: async (): Promise<User[]> => {
    const result = await query('SELECT * FROM users');
    console.log('✅ Fetched all users from the database', result);
    return result.rows;
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  },

  create: async (user: User): Promise<User> => {
    const insertQuery = `INSERT INTO users (name, email, password_hash, profile_pic) 
  VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await query(insertQuery, [
      user.name,
      user.email,
      user.password_hash,
      user.profile_pic,
    ]);
    // ok
    return result.rows[0];
  },
};
