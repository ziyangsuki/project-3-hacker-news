const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const homePageController = require('./contorller/HomePageController.js');
const loginPageController = require('./contorller/LoginPageController.js');
const sighUpPageController = require('./contorller/SighUpPageController.js');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//const postRouter = require('./routes/posts');

// DB Setting Start---------------------------------------------------------
const mongoose = require('mongoose');

// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb://127.0.0.1/project_3_hacker_news';

// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
// DB Setting End-----------------------------------------------------------

const UserModel = require('./model/user.model')


// ---------------Sign In Page API---------------
app.get('/findAllUsers', sighUpPageController.findAllUsers)
app.post('/addUser', sighUpPageController.addUser);


//Wildcard. The root redirect. 
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Listen to port, 8000.
app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});