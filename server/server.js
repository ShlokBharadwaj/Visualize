const express = require('express');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'visualizeDB';
const collectionName = 'visualizations';
let jsonData = [];

// Function to read data from the JSON file
const readData = () => {
  // sampleJsonData.json is given to GitHub repo as jsondata.json contains sensitive data
  fs.readFile('./data/jsondata.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data from file:', err);
    } else {
      jsonData = JSON.parse(data);
      updateDatabase();
    }
  });
};

// Function to update the database with the modified JSON data
const updateDatabase = async () => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.deleteMany({});

    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents inserted successfully`);

    client.close();
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
};

// Initial data read and database update
readData();

// Watch for changes in the JSON file and update the data accordingly
fs.watchFile('./data/jsondata.json', (curr, prev) => {
  console.log('JSON file has been modified');
  readData();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
