require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://leonzalion:${process.env.DB_PASS}@dialek-tech-x0vqm.mongodb.net/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

const uploadController = require('./controllers/upload');
app.post('/upload', upload.single('soundBlob'), uploadController);

app.get('/video/:id', (req, res) => {
  const { id } = req.params;
  res.json({id});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const server = http.createServer(app);
server.listen(port, () => console.log(`listening on port ${port}`));
