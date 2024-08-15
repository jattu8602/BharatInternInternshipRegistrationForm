const express = require('express');
const app = express();
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
  res.send('PONG');
})
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
