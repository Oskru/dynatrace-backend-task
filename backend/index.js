import express from 'express';
import { router as averagesRoutes } from './routes/averages.js';
import { router as maxMinAveragesRoutes } from './routes/maxminaverages.js';
import { router as majorDifferencesRoutes } from './routes/majordifferences.js';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/averages', averagesRoutes);
app.use('/api/max-min-averages', maxMinAveragesRoutes);
app.use('/api/major-differences', majorDifferencesRoutes);

// Launch server
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
