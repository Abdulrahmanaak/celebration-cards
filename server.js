import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'counts.json');
function loadCounts() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}
function saveCounts(counts) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(counts, null, 2));
}

app.get('/api/cards/:id/count', (req, res) => {
  const counts = loadCounts();
  const id = req.params.id;
  const count = counts[id] || 0;
  res.json({ count });
});

app.post('/api/cards/:id/increment', (req, res) => {
  const counts = loadCounts();
  const id = req.params.id;
  counts[id] = (counts[id] || 0) + 1;
  saveCounts(counts);
  res.json({ count: counts[id] });
});

app.get('/api/cards/all', (req, res) => {
  const counts = loadCounts();
  res.json(counts);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server listening on ${port}`);
});
