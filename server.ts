import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { processGrammarCorrection } from './server/geminiService';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API Endpoints
app.post('/api/analyze', async (req, res) => {
  try {
    const { sentence, tone } = req.body;
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ error: 'Sentence is required' });
    }
    const result = await processGrammarCorrection(sentence, tone);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Server error' });
  }
});

app.post('/api/batch', async (req, res) => {
  try {
    const { sentences } = req.body;
    if (!Array.isArray(sentences)) {
      return res.status(400).json({ error: 'Sentences array required' });
    }
    const results = await Promise.all(
      sentences.map((s: string) => processGrammarCorrection(s))
    );
    res.json({ results });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: 'gemini-3.8-flash' });
});

// Serve static frontend in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
