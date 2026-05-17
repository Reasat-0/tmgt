import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
// Connection Stauts showing
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error acquiring client', err.stack);
    }
    console.log('✅ Database connected to Neon PostgreSQL!');
    release();
});
export const query = (text, params) => pool.query(text, params);
//# sourceMappingURL=db.js.map