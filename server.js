const express = require('express');
const app = express();
const path = require('path');

//const postRouter = require('./routes/posts');

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


const TestUserModel = require('./model/testUser.model')

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/testApiGet', function(req, res){
    const testUsers = TestUserModel.findAllUsers()
        .then((findAllUserResponse) => {
            res.status(200).send(findAllUserResponse);
        }, (error) => {
            res.status(500).send(error);
        })
})

//Test API. Take it as a reference.
app.post('/testApiPost', function(req, res){
    console.log(req.body);
    let newUser = {
        userId: req.body.requestData.userId,
        account: req.body.requestData.account,
        password: req.body.requestData.password
    }
    TestUserModel.addUser(newUser)
        .then((newUserResponse)=>{
            res.status(200).send({responseDate:"This is response data"});
        }, (error) => {
            res.status(500).send(error);
        });
})

//Wildcard. The root redirect. 
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Listen to port, 8000.
app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});