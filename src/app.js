const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/movies', require('./routes/movieRoutes'));

module.exports = app;
