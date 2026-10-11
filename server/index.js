import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import repairRoutes from './routes/repairs.js';
import contactRoutes from './routes/contact.js';
import { errorHandler } from './middleware/error.js';

const app = express();
app.use(helmet());
const clientOrigin = process.env.CLIENT_ORIGIN?.trim().replace(/\/+$/, '');
app.use(cors({ origin: clientOrigin || undefined }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/repairs', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }), repairRoutes);
app.use('/api/contact', contactRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log('API ready'));
