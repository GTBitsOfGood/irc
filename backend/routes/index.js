//
// Header for routes/index.js
//
const OK_CODE = 200; // the ok code
const express = require('express');
const router = express.Router({});
const transactionsApi = require('./transactions')
const Client = require('../model/client');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const config = require('./../../config');
const mongoose = require('mongoose');

mongoose.connect(config.db_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

var cookieParser = require('cookie-parser');
router.use(cookieParser());

const UserModel = require('../model/user');
const UserDB = mongoose.model('User', UserModel.__Schema);

const LocalStrategy = require('passport-local').Strategy;

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const jwtStrategy = new JWTStrategy({
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async function (token, done) {
  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET);
    const email = decoded.email;
    const password = decoded.password;
    const user = await UserDB.findOne({ email });
    if (!user) {
      return done(null, false, generateUserNotFoundError(email));
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);

    return done(null, user, 
      { message: 'Logged in Successfully', token,
      errorCode: OK_CODE });
  } catch (error) {
    return done(error);
  }
});

const loginStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async function (req, email, password, done) {
  try {
    const user = await UserDB.findOne({ email });
    if (!user) {
      return done(null, false, generateUserNotFoundError(email));
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);

    return done(null, user, 
      { message: 'Logged in Successfully', 
        token,
         errorCode: OK_CODE
      });
  } catch (error) {
    return done(error);
  }
});

passport.use('login', loginStrategy);
passport.use("jwt", jwtStrategy);

router.post('/signup', function (req, res) {
  UserDB.create(req.body, async function (err, newUser) {
    if (err) {
      if (err.code === 11000) 
        return res.json(
        { 
          complete: false, 
          message: "User with that email already exists.", 
          errorCode: 409,
          error: "Error 409 - Conflict with current resource - A user with" +
          " that e-mail already exists."
        });
      if (err.errors) return res.json({
        complete: false,
        message: `The following required fields are missing: ${Object.keys(err.errors).join(", ")}`
      });

      return res.json({ complete: false, message: "Email and password are required." });
    }

    // Account created. Redirect to login
    const email = newUser.email;
    const password = req.body.password; // Password is scrambled in newUser, must get original
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);
    return res.json({ complete: true, userVerify: true, urlRedirect: "dashboard", setCookies: { token: token } })
  });
});

router.post('/login', function (req, res) {
  passport.authenticate('login', { session: false }, async function (err, user, obj) {
    if (!user) {
      res.json({ complete: false, message: obj.message, error: obj.error });
      return;
    }
    const email = req.body.email;
    const password = req.body.password; // Password is scrambled in newUser, must get original
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);
    res.cookie("token", token).json(
      { complete: true, userVerify: true, urlRedirect: "dashboard", setCookies: { token }, errorCode: OK_CODE 
    });
  })(req, res)
});

router.post('/verify', async function (req, res, next) {
  try {
    const encodedToken = req.cookies.token || req.body.token || 
    (() => { throw generateTokenError() })();
    const decodedToken = await jwt.verify(encodedToken, config.JWT_SECRET);

    const email = decodedToken.email;
    const password = decodedToken.password;

    const user = await UserDB.findOne({ email }) 
      || (() => { throw generateUserNotFoundError(email) })();
    const validate = await user.isValidPassword(password);

    if (user && validate) {
      return res.json({ userVerify: true, 
        user: { _id: user._id, email: user.email } });
    }

    return res.json({ userVerify: false, urlRedirect: "login" })
  } catch (error) {
    console.log(error);
    return res.json({ userVerify: false, urlRedirect: "login", 
      message: error.message, error: error.error })
  }
});

router.use(async function (req, res, next) {
  try {
    const encodedToken = req.cookies.token || req.body.token || 
      (() => { throw generateTokenError() })();
    const decodedToken = await jwt.verify(encodedToken, config.JWT_SECRET);

    const email = decodedToken.email;
    const password = decodedToken.password;

    console.log(decodedToken.email);
    const user = await UserDB.findOne({ email }) || 
    (() => { throw generateUserNotFoundError(email)})();
    console.log(email);
    const validate = await user.isValidPassword(password);

    if (user && validate) {
      return next(null, user);
    }

    return res.json({ userVerify: false, urlRedirect: "login" })
  } catch (error) {
    console.log(error);
    return res.json({ userVerify: false, urlRedirect: "login", 
      message: error.message,
      error: error.error })
  }
});

// ROUTES PROTECTED BELOW THIS LINE

router.use('/transactions', transactionsApi);

router.post('/addClient', async (req, res, next) => {
  const { client } = req.body;
  Client.create(client, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(OK_CODE).send("Success");
  });
});

router.get('/getAllClients', async (req, res, next) => {
  try {
    const allClients = await Client.find();
    res.json(allClients);
  } catch (err) {
    next(err);
  }
});

/**
 * Returns message body for when the user cannot be found
 * @param {string} user email 
 */
function generateUserNotFoundError(email) {
  return { 
    message: 'User not found', 
    error: 'Error 404 - ' +
      'Resource Not Found - A user could not be found with the associated email, ' 
        + email,
    errorCode: 404
  }
}

function generateTokenError() {
  return {
    message: "Token cookie provided",
    error: "Error 401 - Unauthorized - No login token  provided",
    errorCode: 401
  }
}

module.exports = router;