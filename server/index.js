const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const PORT = process.env.port || 3001;

const app = express();

const storage = new GridFsStorage(process.env.MONGO_URI_TEST);

const upload = multer({storage});

mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Connection successful!');
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});