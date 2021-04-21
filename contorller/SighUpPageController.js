const UserModel = require('../model/user.model')
const { v4: uuid } = require('uuid');

exports.addUser = function(req, res){
    console.log(req.body);
    let newUser = {
        userId: uuid(),
        account: req.body.user.account,
        password: req.body.user.password
    }
    UserModel.addUser(newUser)
        .then((addUserResponse)=>{
            userToken = newUser.userId;
            res.status(200).send({res_msg:"Success", res_body:{token:userToken}});
        }, (error) => {
            res.status(500).send(error);
        });
};

exports.findAllUsers = function(req, res){
    const testUsers = UserModel.findAllUsers()
        .then((findAllUserResponse) => {
            res.status(200).send({res_msg:"Success", res_body: findAllUserResponse});
        }, (error) => {
            res.status(500).send(error);
        })
}