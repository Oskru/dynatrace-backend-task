import express from 'express';
import { router as averagesRoutes } from './routes/averages.js';
import { router as maxMinAveragesRoutes } from './routes/maxminaverages.js';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/averages', averagesRoutes);
app.use('/api/maxminaverages', maxMinAveragesRoutes);

// Launch server
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
