import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);
app.use('/', (req, res) => {
    res.send('Welcome to the Tour Manager API');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map