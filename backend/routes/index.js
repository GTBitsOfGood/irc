//
// Header for routes/index.js
//
const express = require('express');
const router = express.Router({});
const transactionsApi = require('./transactions-router')
const userApi = require('./user-router');

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
      return done(null, false, response.generateResponseMessage(message, errorCode, error));
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

/**
 * @param res - the response
 * @param email - the email
 * @param password - the user's password - unscrambled
 * @return - the token
 *
 * BE CAREFUL WHEN CALLING THIS METHOD: SIGNS TOKENS AS VALID
 */
async function signToken(res, email, password) {
  const token = await jwt.sign({ email, password }, config.JWT_SECRET);
  res.cookie("token", token);
  return token;
}

passport.use('login', loginStrategy);
passport.use("jwt", jwtStrategy);

router.post('/signup', function (req, res) {
  UserDB.create(req.body, async function (err, newUser) {
    if (err) {
      if (err.code === 11000) {
        return res.json(response.generateResponseMessage(
          "User with that email already exists.",
          409,
          "Error 409 - Conflict with current resource - A user with" +
          " that e-mail already exists.",
          {
            complete: false,
          }
        ));
      }
      if (err.errors) {
        const response = response.generateResponseMessage(
          `The following required fields are missing: ${Object.keys(err.errors).join(", ")}`,
          400,
          "Error 400 - Invalid syntax when trying to signup",
          {complete: false}
        )
        return res.json(response)
      }

      return res.json(response.generateResponseMessage("Internal server error", 500,
      error = "Error 500 - Internal Server Error - Line 114 in main route."))

    }

    // Account created. Redirect to login
    const email = newUser.email;

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
    const token = await signToken(res, req.body.email, req.body.password);
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
    const error = "Error 400 - Bad Request - Could not validate user. Bad password.";
    const params = {
      userVerify: false,
      urlRedirect: "login",
    };
    return res.json(response.generateResponseMessage(message, errorCode, error, params));
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

    const user = await UserDB.findOne({ email }) ||
    (() => { throw response.generateUserNotFoundError(email)})();

    const validate = await user.isValidPassword(password) || (() => {
      const message = 'The user\'s account has not been verified'
      const errorCode = 400;
      const errorMessage = 'Error 400 - Bad Request - The user could not be verified'
      throw response.generateResponseMessage(message, errorCode, errorMessage);
    })();

    // if the user, continue with the res
    res.locals.user = user;
    return next(null, user);
  } catch (error) {
    // assume the error conforms to the message requirements
    const params = {userVerify: false, urlRedirect: "login"}
    return res.json(Object.assign({}, error, params));
  }
});


// ROUTES PROTECTED BELOW THIS LINE
router.use('/user', userApi);
router.use('/transactions', transactionsApi);

// TODO: MOVE THIS ROUTE TO THE USER-ROUTER AND/OR A ROUTER DEDICATED TO LOGGIN IN
router.post('/changePassword', async function(req, res, next) {
  const user = res.locals.user;
  let returnMessage;
  if (!user) {
    returnMessage =
    response.generateResponseMessage("The user object could not be found in the"
    + " request", 400);
  } else {
    const newPassword = req.body.password;
    if (!newPassword) {
      returnMessage =
      response.generateResponseMessage("No new password specified under the 'passwprd'"
      + " field", 400);
    } else {
      user.password = newPassword;
      user.save();
      returnMessage = response.generateOkResponse("Password updated")
      await signToken(res, user.email, newPassword);

    }
  }
  res.json(returnMessage);
});

router.post('/addClient', async (req, res, next) => {
  const client = req.body;
  Client.create(client, (err) => {
    if (!!err) {
      res.json(response.generateResponseMessage('Error 400 - Bad Request- ' +
      'Invalid syntax when trying to' +
      ' create client (see error)', 400, error = err));
    } else {
      res.json(response.generateOkResponse("Client added successfully"));
    }
  });
});

router.get('/getAllClients', async (req, res, next) => {
  try {
    const allClients = await Client.find({});
    res.json(response.generateOkResponse("All is well.", allClients));
  } catch (err) {
    res.json(response.generateInternalServerError(err));
  }
});


module.exports = router;
