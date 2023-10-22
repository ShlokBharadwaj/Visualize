const express = require('express');
const { MongoClient } = require('mongodb');

// sampleJsonData.json is given to GitHub repo as jsondata.json contains sensitive data
const jsonData = require('./data/jsondata.json');

const app = express();
const PORT = 3000;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'visualizeDB';
const collectionName = 'visualizations';

// Connect to the database
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Delete all documents from the collection
    collection.deleteMany({})
      .then(() => {
        // Insert JSON data into the database
        collection.insertMany(jsonData, (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
          } else {
            console.log(`${result.insertedCount} documents inserted successfully`);
          }
          client.close();
        });
      })
      .catch(err => console.error('Error deleting documents:', err));
  })
  .catch(err => console.error('Error connecting to the database', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
