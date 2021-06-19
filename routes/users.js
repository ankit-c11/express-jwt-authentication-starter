const mongoose = require('mongoose');
const router = require('express').Router();   
const connection = require('../config/database')
const User = connection.models.User
const passport = require('passport');
const utils = require('../lib/utils');
const { authorize } = require('passport');

// TODO
router.get('/protected',passport.authenticate('jwt',{session:false}), (req, res, next) => {
     res.json({success:true,msg:"you are authorized!"})
  
});

// TODO
router.post('/login', function(req, res, next){
const {username,password} = req.body;
User.findOne({username}).then(user => {
    if(!user){
        res.json({success:false,msg:"user not found..."})
    }
    const isValid = utils.validPassword(password,user.hash,user.salt)
    if(isValid){
        const token = utils.issueJWT(user)
        res.json({success:true,user,...token})
    }
    else{
        res.json({success:false,msg:"Incorrect Password!"})
    }
})
.catch(err => {
    next(err)
})
});

// TODO
router.post('/register', function(req, res, next){
    const {salt,hash} = utils.genPassword(req.body.password);
    // console.log(req.body)
    // next()
    const newUser = new User({
        username:req.body.username,
        hash,
        salt
    })

    newUser.save()
           .then(user => {
               const jwt = utils.issueJWT(user)
               res.json({success:true,user,...jwt})
           })
           .catch(err => {
               res.json({err})
           })
});

module.exports = router;