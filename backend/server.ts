// Backend: Updated Database Schema and Routes
import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Database initialization
const initializeDb = async () => {
  const db = await open({
    filename: "./todos.db",
    driver: sqlite3.Database,
  });

  // Create todos table with repeating field
  await db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    repeats_daily BOOLEAN NOT NULL DEFAULT 0 CHECK (repeats_daily IN (0, 1)),
    last_completed TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  return db;
};

let db: any;
(async () => {
  db = await initializeDb();
})();

// Helper function to check and reset repeating todos
const resetRepeatingTodos = async () => {
  const today = new Date().toISOString().split("T")[0];

  // Reset completed status for repeating todos that were completed yesterday or earlier
  await db.run(
    `
    UPDATE todos 
    SET completed = 0 
    WHERE repeats_daily = 1 
    AND completed = 1 
    AND date(last_completed) < date(?)
  `,
    [today]
  );
};

// Routes
app.get("/todos", async (req, res) => {
  try {
    await resetRepeatingTodos();
    const todos = await db.all("SELECT * FROM todos ORDER BY created_at DESC");
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const {
      text,
      priority = "medium",
      completed = false,
      repeats_daily = false,
    } = req.body;

    const result = await db.run(
      "INSERT INTO todos (text, priority, completed, repeats_daily) VALUES (?, ?, ?, ?)",
      [text, priority, completed ? 1 : 0, repeats_daily ? 1 : 0]
    );

    const todo = await db.get(
      "SELECT * FROM todos WHERE id = ?",
      result.lastID
    );
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const { text, completed, priority, repeats_daily } = req.body;
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (text !== undefined) {
      updateFields.push("text = ?");
      updateValues.push(text);
    }

    if (completed !== undefined) {
      updateFields.push("completed = ?");
      updateFields.push("last_completed = ?");
      updateValues.push(completed ? 1 : 0);
      updateValues.push(completed ? new Date().toISOString() : null);
    }

    if (priority !== undefined) {
      updateFields.push("priority = ?");
      updateValues.push(priority);
    }

    if (repeats_daily !== undefined) {
      updateFields.push("repeats_daily = ?");
      updateValues.push(repeats_daily ? 1 : 0);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    updateValues.push(req.params.id);

    await db.run(
      `UPDATE todos SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );

    const updatedTodo = await db.get(
      "SELECT * FROM todos WHERE id = ?",
      req.params.id
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await db.run("DELETE FROM todos WHERE id = ?", req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
