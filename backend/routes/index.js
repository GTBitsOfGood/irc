//
// Header for routes/index.js
//

const express = require('express');
const router = express.Router({});
const transactionsApi = require('./transactions');

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
      return done(null, false, { message: 'User not found' });
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);

    return done(null, user, { message: 'Logged in Successfully', token });
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
      return done(null, false, { message: 'User not found' });
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);

    return done(null, user, { message: 'Logged in Successfully', token });
  } catch (error) {
    return done(error);
  }
});

passport.use('login', loginStrategy);
passport.use("jwt", jwtStrategy);

router.post('/signup', function (req, res) {
  UserDB.create(req.body, async function (err, newUser) {
    if (err) {
      if (err.code === 11000) return res.json({ complete: false, message: "User with that email already exists." });
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
      res.json({ complete: false, message: obj.message });
      return;
    }
    const email = req.body.email;
    const password = req.body.password; // Password is scrambled in newUser, must get original
    const token = await jwt.sign({ email, password }, config.JWT_SECRET);
    res.cookie("token", token).json({ complete: true, userVerify: true, urlRedirect: "dashboard", setCookies: { token } })
  })(req, res)
});

router.post('/verify', async function (req, res, next) {
	try {
		const encodedToken = req.cookies.token || req.body.token || (() => { throw "No token cookie provided" })();
		const decodedToken = await jwt.verify(encodedToken, config.JWT_SECRET);

		const email = decodedToken.email;
		const password = decodedToken.password;

		const user = await UserDB.findOne({ email }) || (() => { throw `No user with email "${email}" found` })();
		const validate = await user.isValidPassword(password);

		if (user && validate) {
			return res.json({ userVerify : true, user : { _id : user._id, email : user.email } });
		}

		return res.json({ userVerify: false, urlRedirect: "login" })
	} catch (error) {
		console.log(error);
		return res.json({ userVerify: false, urlRedirect: "login", message : error })
	}
});

router.use(async function (req, res, next) {
  try {
    const encodedToken = req.cookies.token || req.body.token || (() => { throw "No token cookie provided" })();
    const decodedToken = await jwt.verify(encodedToken, config.JWT_SECRET);

    const email = decodedToken.email;
    const password = decodedToken.password;

	  console.log(decodedToken.email);
    const user = await UserDB.findOne({ email }) || (() => { throw `No user with email "${email}" found` })();
    console.log(email);
    const validate = await user.isValidPassword(password);

    if (user && validate) {
      return next(null, user);
    }

    return res.json({ userVerify: false, urlRedirect: "login" })
  } catch (error) {
    console.log(error);
    return res.json({ userVerify: false, urlRedirect: "login", message : error })
  }
});

// ROUTES PROTECTED BELOW THIS LINE

router.use('/transactions', transactionsApi);

module.exports = router;