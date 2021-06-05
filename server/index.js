const cors = require('cors');
const crypto = require('crypto');
const dotenv = require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const PORT = process.env.port || 3001;

const app = express();
const url = process.env.MONGO_URI_TEST;

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static(path.resolve(__dirname, '../client/build')));

const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {

        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage});

mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

let gfs;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    gfs = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: "uploads"
    });
    console.log('Connection successful!');
});

const fileSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String },
    size: { type: Number }
});

const File = mongoose.model('File', fileSchema);

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    if(!req.file){
        return res.json({error: "Please select a file to upload."});
    } else {
        const name = req.file.originalname;
        const type = req.file.mimetype;
        const size = req.file.size;
        File.findOne({name: name}, function(err, upfile){
            if(err){
                return console.error(err);
            } else if(upfile){
                console.log("file exists");
                return res.json({name: upfile.name, type: upfile.type, size: upfile.size});
            } else {
                console.log("adding new file");
                const newFile = new File({name: name, type: type, size: size});
                newFile.save(function(err, upfile) {
                    if(err){
                        return console.error(err);
                    } else {
                        return res.json({name: upfile.name, type: upfile.type, size: upfile.size});
                    }
                })
            }
        })
    }
})

app.get('/api/view/:filename', (req, res) => {
    gfs.find({filename: req.params.filename}).toArray((err, files) => {
        if(files[0]){
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
            return res.json({error: "File not found"});
        }
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});