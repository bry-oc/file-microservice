const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const PORT = process.env.port || 3001;

const app = express();
const url = process.env.MONGO_URI_TEST;

const storage = new GridFsStorage({url});

const upload = multer({storage});

mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Connection successful!');
});

app.post('/api/fileanalyse', upload.single('file'), (req, res) => {
    const file = req.file;
    if(!file){
        return res.json({error: "Please select a file to upload."});
    } else {
        const name = req.file.originalname;
        const type = req.file.mimetype;
        const size = req.file.size;
        return res.json({name: name, type: type, size, size});
    }
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});