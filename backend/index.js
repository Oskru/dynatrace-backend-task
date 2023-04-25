import express from 'express';
import { router as exchangesRoutes } from './routes/exchanges.js';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/exchanges', exchangesRoutes);

// Launch server
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
