import express from 'express';
import { router as averagesRoutes } from './routes/averages.js';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/averages', averagesRoutes);

// Launch server
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
