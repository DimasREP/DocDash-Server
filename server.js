const express = require('express')
const app = express()
var cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')
require("dotenv").config()


app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/uploads/document', express.static('public/uploads/document'));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(bodyParser.json());
app.use(routes);

const server = app.listen(process.env.APP_PORT, () => console.log(`Api Running in Port ${process.env.APP_PORT}`))

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});