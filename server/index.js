import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import repairRoutes from './routes/repairs.js';
import adminRoutes from './routes/admin.js';
import { errorHandler } from './middleware/error.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/repairs', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }), repairRoutes);
app.use('/api/admin', adminRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('API ready')))
  .catch((e) => { console.error('MongoDB connection failed:', e.message); process.exit(1); });
