require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
let jsonData = [];

// Function to generate a hash value for the JSON data
const generateHash = (data) => {
  return crypto.createHash('sha1').update(JSON.stringify(data)).digest('hex');
}

let previousHash = null;

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
          const currentHash = generateHash(currentData);

          if (previousHash !== currentHash) {
            jsonData = currentData;
            updateDatabase();
            previousHash = currentHash;
          }
          else {
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
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Keep track of existing titles in the database
    const existingTitles = new Set();

    // Fetch existing titles from the database
    const existingData = await collection.find({}).toArray();
    existingData.forEach((data) => {
      existingTitles.add(data.title);
    });

    for (let i = 0; i < jsonData.length; i++) {
      const currentData = jsonData[i];
      if (existingTitles.has(currentData.title)) {
        // If data with the same title exists, update the document
        await collection.updateOne({ title: currentData.title }, { $set: currentData });
        // Remove the title from the set
        existingTitles.delete(currentData.title);
      } else {
        // If data with the same title does not exist, insert a new document
        await collection.insertOne(currentData);
      }
    }

    // Delete documents that no longer exists in the JSON file
    for (let title of existingTitles) {
      await collection.deleteOne({ title: title });
    }

    console.log('Database updated successfully');
  } catch (err) {
    console.error('Error connecting to the database', err);
  } finally {
    if (client) {
      client.close();
    }
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

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send(`Welcome to the Data Visualization Dashboard API<br>You can access the data at <a href="/api/data">/api/data</a>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
