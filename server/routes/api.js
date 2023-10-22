const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

router.get('/data', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const data = await collection.find({}).toArray();
        res.json(data);
        client.close();
    } catch (err) {
        console.error('Error fetching data from MongoDB', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
