//
// Header for routes/index.js
//
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

// for formatted responses
const response = require('../utilities/response.js');
const OK_CODE = response.OK_CODE;
const generateResponseMessage = response.generateResponseMessage;

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
      return done(null, false, response.generateUserNotFoundError(email));
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
      return done(null, false, response.generateUserNotFoundError(email));
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      const message = "Incorrect password"
      const errorCode = 400;
      const error = "Error 400 - Bad Request - Wrong password for user";
      return done(null, false, generateResponseMessage(message, errorCode, error));
    }
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);
    const messageBody = {
      token
    }
    return done(null, user, 
      response.generateOkResponse("Logged in successfully", messageBody));
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
        return res.json(generateResponseMessage(
          "User with that email already exists.",
          409, 
          "Error 409 - Conflict with current resource - A user with" +
          " that e-mail already exists.", 
          {
            complete: false, 
          }
        ));
        
      if (err.errors) {
        const response = generateResponseMessage(
          `The following required fields are missing: ${Object.keys(err.errors).join(", ")}`,
          400,
          "Error 400 - Invalid syntax when trying to signup",
          {complete: false}
        )
        return res.json(response)
      }
      return res.json(generateResponseMessage("Internal server error", 500,
      error = "Error 500 - Internal Server Error - Line 114 in main route."))
    }

    // Account created. Redirect to login
    const email = newUser.email;
    const password = req.body.password; // Password is scrambled in newUser, must get original
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);
    const params = {
      complete: true, 
      userVerify: true, 
      urlRedirect: "dashboard", 
      setCookies: { token: token } 
    };
    const message = response.generateOkResponse("Success", params);
    return res.json(message)
  });
});

router.post('/login', function (req, res) {
  passport.authenticate('login', { session: false }, async function (err, user, returnMsg) {
    if (!user) {
      // concat the return message with the complete: false parameter
      res.json(Object.assign({}, returnMsg, {complete: false}));
      return;
    }
    const email = req.body.email;
    const password = req.body.password; // Password is scrambled in newUser, must get original
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);
    res.cookie("token", token);
    const messageBody = {
      complete: true, 
      userVerify: true, 
      urlRedirect: "dashboard", 
      setCookies: { token }, 
    };
    res.json(response.generateOkResponse("Login success", messageBody));
  })(req, res);
});

router.post('/verify', async function (req, res, next) {
  try {
    const encodedToken = req.cookies.token || req.body.token || 
    (() => { throw response.generateTokenError() })();
    const decodedToken = await jwt.verify(encodedToken, config.JWT_SECRET);

    const email = decodedToken.email;
    const password = decodedToken.password;

    const user = await UserDB.findOne({ email }) 
      || (() => { throw response.generateUserNotFoundError(email) })();
    const validate = await user.isValidPassword(password);

    if (user && validate) {
      const params = { 
        userVerify: true, 
        user: { 
          _id: user._id, 
          email: user.email } 
      };
      return res.json(response.generateOkResponse("Verify success", params));
    }
    const message = "Could not validate user";
    const errorCode = 400
    const error = "Error 400 - Bad Request - Could not validate user";
    const params = {
      userVerify: false, 
      urlRedirect: "login",
    };
    return res.json(generateResponseMessage(message, errorCode, error, params));
  } catch (error) {
    // errors aligns with message format already
    const params = {
      userVerify: false, 
      urlRedirect: "login",
    };
    return res.json(Object.assign({}, error, params)); // concat msg and params
  }
});

router.use(async function (req, res, next) {
  try {
    const encodedToken = req.cookies.token || req.body.token || 
      (() => { throw response.generateTokenError() })();
    const decodedToken = await jwt.verify(encodedToken, config.JWT_SECRET);

    const email = decodedToken.email;
    const password = decodedToken.password;

    console.log(decodedToken.email);
    const user = await UserDB.findOne({ email }) || 
    (() => { throw response.generateUserNotFoundError(email)})();
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
  const client = req.body;
  Client.create(client, (err) => {
    if (!!err) {
      res.json(generateResponseMessage('Error 400 - Bad Request- ' +
      'Invalid syntax when trying to' + 
      ' create client (see error)', 400, error = err));
    } else {
      res.json(response.generateOkResponse("Client added successfully"));
    }
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


module.exports = router;