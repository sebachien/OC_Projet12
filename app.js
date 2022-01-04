const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');


const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.use('/api/auth', userRoutes);
app.use('/api/contact', contactRoutes);

const db = require("./models");


module.exports = app;