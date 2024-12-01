const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for frontend requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// PostgreSQL database connection configuration
const client = new Client({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost',
  database: 'tremblement_de_terre', // Your database name
  password: 'your_password', // Your database password
  port: 5432,
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// API to execute the SQL query
app.post('/api/buildings', async (req, res) => {
  const { query } = req.body;

  try {
    const result = await client.query(query);
    res.json(result.rows); // Send the result as JSON
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Error executing query' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
