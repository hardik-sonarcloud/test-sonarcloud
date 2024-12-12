const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Using SQLite for simplicity
const helmet = require("helmet");

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.hidePoweredBy());

db.serialize(() => {
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
    db.run("INSERT INTO users (username, password) VALUES ('admin', 'password123')");
});
app.get('/login', (req, res) => {
    const { username, password } = req.query;
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`; // Updated query
    db.all(sql, [username, password], (err, rows) => { // Updated parameters
        if (rows.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Invalid credentials!');
        }
    });
});

app.get('/greet', (req, res) => {
    const name = req.query.name || 'Guest';
    res.set('Content-Type', 'text/plain'); // Set content-type header
    res.send(`Welcome, ${name}!`);
});

app.get('/redirect', (req, res) => {
    const { url } = req.query; // Removed unused variable 'url2'
    if (url.startsWith("https://www.example.com/")) {
        res.redirect(url);
    }
});

app.post('/deserialize', (req, res) => {
    const { data } = req.body;
    const parsed = JSON.parse(data); 
    res.send(`Deserialized data: ${JSON.stringify(parsed)}`);
});

app.get('/error', (req, res) => {
    try {
        throw new Error('Something went wrong!');
    } catch (err) {
        res.status(500).send(err.stack);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});