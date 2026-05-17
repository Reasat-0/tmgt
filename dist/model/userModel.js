import { query } from '../config/db.js';
export const userModel = {
    getAllUsers: async () => {
        const result = await query('SELECT * FROM users');
        console.log('✅ Fetched all users from the database', result);
        return result.rows;
    },
    findUserByEmail: async (email) => {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    },
    create: async (user) => {
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
//# sourceMappingURL=userModel.js.map