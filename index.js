// app.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Sample in-memory user data
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// Endpoint to get user information
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Endpoint to create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  res.status(201).json(newUser);
});

// Endpoint to get product information
app.get('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    // Communicate with the product service (assuming it runs on port 3002)
    const productResponse = await axios.get('http://localhost:3002/products/' + productId);
    res.json(productResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`User Service is running on http://localhost:${port}`);
});
