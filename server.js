const express = require('express');

// const path = require('path');
const htmlRoute = require('./routes/htmlRoute');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Route Call
app.use('/', htmlRoute);


// starts PORT server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));