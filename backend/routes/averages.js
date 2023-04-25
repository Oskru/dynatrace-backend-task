import express from 'express';
import { averagesController } from '../controllers/averages.js';

export const router = express.Router();

router.get('/:currency/:date', averagesController);
