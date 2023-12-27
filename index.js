const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = require('./config/db');
dbConfig();

// Load models
require('./models/user');
require('./models/survey');

// Load routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/survey', require('./routes/survey'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
