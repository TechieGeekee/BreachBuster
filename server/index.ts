import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Serve static files from the root directory
app.use(express.static(join(__dirname, '..')));

// Handle all routes by serving index.html (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛡️ Breach Buster server running at http://0.0.0.0:${PORT}/`);
  console.log('🚀 Your cyber security app is ready!');
});