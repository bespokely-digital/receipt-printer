import express from 'express';
import printRoutes from './routes/printRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
// app.use('/api', printRoutes);
app.use(express.static('public')); // Serve static files from "public" directory

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});