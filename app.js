const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const contactRoutes = require('./routes/contact');
//const contractRoutes = require('./routes/contract');
//const productRoutes = require('./routes/product');


const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())


app.use('/api/contact', contactRoutes);
//app.use('/api/contract', contractRoutes);
//app.use('/api/product', productRoutes);



module.exports = app;