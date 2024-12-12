const express = require('express');
const { add, subtract } = require('./mathOperations');
const { logMessage } = require('./logger');

const app = express();
const port = 3000;

app.disable("x-powered-by");

app.get('/add', (req, res) => {
  const { a, b } = req.query;
  const result = add(Number(a), Number(b));
  logMessage(`Addition Result: ${result}`);
  res.send(`Addition Result: ${result}`);
});

app.get('/subtract', (req, res) => {
  const { a, b } = req.query;
  const result = subtract(Number(a), Number(b));
  logMessage(`Subtraction Result: ${result}`);
  res.send(`Subtraction Result: ${result}`);
});

app.listen(port, () => {
  logMessage(`Server is running on http://localhost:${port}`);
});

// file: test.js
const { add: addAlias, subtract } = require('./mathOperations');

console.log(addAlias(2, 3)); 
console.log(subtract(5, 2));