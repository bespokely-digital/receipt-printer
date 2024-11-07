import express from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from "public" directory

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});