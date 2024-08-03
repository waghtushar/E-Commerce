const passport = require("passport");
const adminModel = require("../models/admin.schema");
const LocalStrategy = require("passport-local").Strategy;

// Middleware check request body contains all required fields
const auth = (req, res, next) => {
  const { username, email, password, confirmPass } = req.body;
  if (username && email && password && confirmPass) {
    next();
  } else {
    res.send("All fields are required.");
  }
};

// Middleware check the user is authenticated
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// Passport configuration for local authentication
const localAuth = (passport) => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      let user = await adminModel.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await adminModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = { auth, isAuth, localAuth }
