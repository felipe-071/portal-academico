const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// https://bcrypt-generator.com/

const users = [{
    _id: 1,
    username: 'adm', 
    password: '$2a$12$haH4pnFnx/.QSoVy/bVz2uReXN.7I.3u4zCfBTPkEdovohWscBjO.', //123
    email: 'adm@gmail.com'

}];

function findUser(username){
    return users.find(item => item.username === username);
}

function findUserById(id){
    return users.find(item => item._id === id);
}

module.exports = (passport) => {

    passport.serializeUser((user, done)=>{
        done(null, user._id);
    });

    passport.deserializeUser((id,done)=>{
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (error) {
            console.log(error);
            return done (error,null);
        }
        });
    }