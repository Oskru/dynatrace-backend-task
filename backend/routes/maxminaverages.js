import express from 'express';
import { maxMinAveragesController } from '../controllers/maxminaverages.js';

export const router = express.Router();

router.get('/:currency/:quotation', maxMinAveragesController);
