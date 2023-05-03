const express = require('express')
const app =express()
require('dotenv').config()
const bodyParser = require('body-parser');
const db = require('./model/model')
const cookieParser = require('cookie-parser');
const Router = require('./router/router')
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', Router)


db.sequelize.sync(
  // {force : true}
).then(
  console.log("Syncing is complete")
);


app.get('/', async (req, res) => {
  try {
    res.send(`Welcome to API Kobi Education Backend!`);
  } catch (error) {
    console.log(error);;
  }
});


PORT = process.env.PORT
app.listen(PORT, () => {console.log(`Application is running on ${PORT}!! `)})