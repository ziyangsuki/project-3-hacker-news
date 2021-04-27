const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const homePageController = require('./contorller/HomePageController.js');
const loginPageController = require('./contorller/LoginPageController.js');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DB Setting Start---------------------------------------------------------
const mongoose = require('mongoose');

//Local
// const mongoEndpoint = 'mongodb://127.0.0.1/project_3_hacker_news';

//Atlas
const mongoEndpoint = "mongodb+srv://project-3-hacker-news:project-3-hacker-news@project-3-hacker-news.altgv.mongodb.net/project-3-hacker-news?retryWrites=true&w=majority";


// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

// DB Setting End-----------------------------------------------------------

// ---------------Login Page API---------------
app.use('/login', loginPageController);

// ---------------Home Page API---------------
app.use('/home', homePageController);


//Wildcard. The root redirect. 
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Listen to port, 8000.
app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});