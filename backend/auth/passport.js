//
// Passport system information
//

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(passport) {
    passport.use(new JWTstrategy({
      secretOrKey : 'dragonsandpandas',
      jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    }, async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }));

    passport.use('signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password'
    }, async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });
          return done(null, user);
        } catch (error) {
          done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password'
    }, async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if( !user ){
          return done(null, false, { message : 'User not found'});
        }
        const validate = await user.isValidPassword(password);
        if( !validate ){
          return done(null, false, { message : 'Wrong Password'});
        }
        return done(null, user, { message : 'Logged in Successfully'});
      } catch (error) {
        return done(error);
      }
    }));
}
