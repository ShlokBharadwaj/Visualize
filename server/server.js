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
  try {
    // sampleJsonData.json is given to GitHub repo as jsondata.json contains sensitive data
    fs.readFile('./data/jsondata.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading data from file:', err);
      } else {
        try {
          const currentData = JSON.parse(data);
          if (JSON.stringify(jsonData) !== JSON.stringify(currentData)) {
            jsonData = currentData;
            updateDatabase();
          } else {
            console.log('No modifications in JSON file');
          }
        } catch (parseErr) {
          console.error('Error parsing JSON:', parseErr);
        }
      }
    });
  } catch (readErr) {
    console.error('Error reading data from file:', readErr);
  }
};

// Function to update the database with the modified JSON data
const updateDatabase = async () => {
  try {
    const client = await MongoClient.connect(url);
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
fs.watchFile('./data/jsondata.json', { persistent: true, interval: 500 }, (curr, prev) => {
  try {
    if (curr.mtime != prev.mtime) {
      console.log('JSON file has been modified');
      readData();
    } else {
      console.log('No modifications in JSON file');
    }
  } catch (watchErr) {
    console.error('Error watching file:', watchErr);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
