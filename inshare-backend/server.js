require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');

// Database connection call
const connectDB = require('./config/db');
connectDB();

// Cors 
// const corsOptions = {
//   origin: process.env.ALLOWED_CLIENTS.split(',')
//   // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
// }
// app.use(cors(corsOptions));


app.use(cors({
  origin: 'http://127.0.0.1:3001', // or your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you're using cookies or authentication
}));


app.use(express.static('public'));

app.use(express.json());


// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));