const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model')
const { v4: uuid } = require('uuid');

router.post('/register', function(req, res) {
  
    console.log(req.body);
    const account = req.body.user.account;
    const password = String(req.body.user.password);
    console.log(account + password);
    if (!account || !password) {
        return res.status(400).send({res_msg:"Error", res_body: "Account or paasword is empty."});
    }

    const user = {
        userId: uuid(),
        account: account,
        password: password, 
    }

    return UserModel.addUser(user)
        .then((response) => {
            const token = jwt.sign(response.account, 'the_secret_salty_salt')
            res.cookie('webtoken', token).status(200).send(response);
        }, (error) => {
            res.status(401).send({res_msg:"Error", res_body: error})
        });
})

router.post('/login', function(req, res) {
    const account = req.body.accoount;
    const password = String(req.body.password);

    if (!account || !password) {
        return res.sendStatus(400).send({res_msg:"Error", res_body: "User not found."});
    }

    return UserModel.findUser(account)
        .then((response) => {
            console.log(response);
            console.log(password);

            if (response.password !== password) {
                return res.status(402).send("Wrong account or password");
            }

            const token = jwt.sign(response.account, 'the_secret_salty_salt')
            res.cookie('webtoken', token).status(200).send(response);
        }, (error) => {
            res.status(401).send({res_msg:"Error", res_body: error})
        });
})

router.post('/logOut', (req, res) => {
    res.clearCookie('webtoken');
    res.sendStatus(200);
})

router.get('/all', function(req, res) {
    const wt = req.cookies.webtoken
    console.log(wt)
    return UserModel.findAllUsers()
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

module.exports = router;