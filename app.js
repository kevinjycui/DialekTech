const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const multer = require('multer');
const fs = require('fs');
const upload = multer();
const cors = require('cors');
const utils = require('./utils.js');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://leonzalion:${process.env.DB_PASS}@dialek-tech-x0vqm.mongodb.net/test`);

const app = express();

app.use(cors());
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'))
});


app.post('/upload', upload.single('soundBlob'), function(req, res) {
  let uploadLocation = __dirname + '/public/uploads/audio.mp3'
  console.log(uploadLocation);
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
  res.json({});
  utils.converter(uploadLocation);
  utils.receiver("./public/uploads/audio.flac");
  utils.comparator("Sample question here"); //put the question here
  utils.displayer();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const server = http.createServer(app);
server.listen(port, () => console.log(`listening on port ${port}`));
