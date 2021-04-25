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
            res.cookie('webtoken', token)
                .cookie('account', response.account)
                .status(200).send(response);
        }, (error) => {
            res.status(401).send({res_msg:"Error", res_body: error})
        });
})

router.post('/login', function(req, res) {
    const account = req.body.user.account;
    const password = String(req.body.user.password);

    console.log(req.body.user.account)

    if (!account || !password) {
        return res.status(400).send({res_msg:"Error", res_body: "Account or paasword is empty."});
    }

    return UserModel.findUser(account)
        .then((response) => {

            if (!response || response.password !== password) {
                return res.status(402).send({res_msg:"Error", res_body: "Wrong account or password."});
            }

            const token = jwt.sign(response.account, 'the_secret_salty_salt')
            res.cookie('webtoken', token)
                .cookie('account', response.account)
                .status(200).send(response);
        }, (error) => {
            res.status(401).send({res_msg:"Error", res_body: error})
        });
})

router.post('/logout', (req, res) => {
    res.clearCookie('webtoken').clearCookie('account').status(200).send();
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