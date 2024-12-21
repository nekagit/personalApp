// server.ts
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Database initialization
const initializeDb = async () => {
  const db = await open({
    filename: './todos.db',
    driver: sqlite3.Database
  });

  // Create todos table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
};

let db: any;
(async () => {
  db = await initializeDb();
})();

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await db.all('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await db.run('INSERT INTO todos (text) VALUES (?)', text);
    const todo = await db.get('SELECT * FROM todos WHERE id = ?', result.lastID);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM todos WHERE id = ?', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});