'use strict';

const express = require('express');
const rates = require('./routes/rates')

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello exchange rate API\n');
});

app.use(rates());

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
