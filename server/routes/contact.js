import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createContactMessage } from '../controllers/contact.js';

export default Router().post('/', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), createContactMessage);
