const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  // Configure passport to use LocalStrategy for authentication
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Find a user by their email in the database
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        // If no user is found with the given email
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        // If the user's account is registered using a sign-in provider without a password
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        // Compare the entered password with the user's stored password
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          // If the password matches, authentication is successful
          if (isMatch) {
            return done(null, user);
          }
          // If the password does not match
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  // Serialize user information to be stored in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user information from the session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
