const fs = require('fs');
const passport = require('passport');
const path = require('path');
const connection = require('./database')
const User = connection.models.User

const {Strategy,ExtractJwt} = require('passport-jwt')

// console.log(typeof Strategy,typeof ExtractJwt)

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// TODO
const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:PUB_KEY,
    algorithms:['RS256']
};

const strategy = new Strategy(options,(payload,done) => {
    console.log(payload)
    User.findOne({_id:payload.sub})
    .then(user => {
        if(user){
            console.log("user verified")
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
    .catch(err => {
        done(err,null)
    })
})

// TODO
module.exports = (passport) => {
    passport.use(strategy)
}