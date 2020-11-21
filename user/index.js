require('dotenv').config();
const { port } = require('./infrastructure/config').server;
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./infrastructure/rest/user-controller');
const bodyParser = require('body-parser');
const jsonContentType = require('./infrastructure/rest/middleware/json-content-type');
const errorHandler = require('./infrastructure/rest/middleware/error-handler');

const app = express();
app.use(helmet());
app.use(cors())
app.use(bodyParser.json());
app.use(jsonContentType);

app.use('/api', userRoutes);

app.use(errorHandler);

const server = app.listen(port, () => console.log(`User module listening at http://localhost:${port}`));
module.exports = { app, server };