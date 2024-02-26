import express from 'express';
import calenderRoutes from './routes/calenderFunctionRoutes.js';

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1',calenderRoutes);

export default app;