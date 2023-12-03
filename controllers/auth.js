const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// Render login page
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("login", {
    title: "Login",
  });
};

// Handle login post request
exports.postLogin = (req, res, next) => {
  const validationErrors = [];

  // Validate email
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  // Validate password
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Please enter a valid password." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }

  // Normalize email for consistent comparison
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Authenticate using Passport local strategy
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    // Log in the user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/home");
    });
  })(req, res, next);
};

// Handle user logout
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.');
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error: Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

// Render signup page
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

// Handle signup post request
exports.postSignup = (req, res, next) => {
  const validationErrors = [];

  // Validate email
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  // Validate password length
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });

  // Confirm password
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }

  // Normalize email for consistent comparison
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Create a new user
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    belief: req.body.moodbeliefs,
    disorders: req.body.disorders,
    password: req.body.password,
  });

  // Check for existing user with the same email or username
  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      // Save the new user
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // Log in the new user
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/home");
        });
      });
    },
  );
};
