const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        github_url TEXT,
        live_url TEXT,
        technologies TEXT
      )
    `);
  }
});

// Routes
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/projects', (req, res) => {
  const { title, description, image_url, github_url, live_url, technologies } = req.body;
  db.run(
    'INSERT INTO projects (title, description, image_url, github_url, live_url, technologies) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, image_url, github_url, live_url, technologies],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Additional routes for CRUD operations
app.get('/api/projects/:id', (req, res) => {
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(row);
  });
});

app.put('/api/projects/:id', (req, res) => {
  const { title, description, image_url, github_url, live_url, technologies } = req.body;
  db.run(
    'UPDATE projects SET title = ?, description = ?, image_url = ?, github_url = ?, live_url = ?, technologies = ? WHERE id = ?',
    [title, description, image_url, github_url, live_url, technologies, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.json({ message: 'Project updated successfully' });
    }
  );
});

app.delete('/api/projects/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json({ message: 'Project deleted successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 