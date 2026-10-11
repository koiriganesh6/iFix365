import { Router } from 'express';
import { createRepair } from '../controllers/repairs.js';
export default Router().post('/', createRepair);
