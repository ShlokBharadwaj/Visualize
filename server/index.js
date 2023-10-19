const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Backend Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/d-viz-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});
