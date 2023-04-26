import express from 'express';
import { majorDifferencesController } from '../controllers/majordifferences.js';

export const router = express.Router();

router.get('/:currency/:quotation', majorDifferencesController);
