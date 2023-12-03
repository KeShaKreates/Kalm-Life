// Exporting an object with middleware functions related to user authentication
module.exports = {
  // Middleware to ensure user is authenticated
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // Continue to the next middleware or route handler
      return next();
    } else {
      // Redirect to the home page if user is not authenticated
      res.redirect("/");
    }
  },

  // Middleware to ensure guest (non-authenticated user)
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      // Continue to the next middleware or route handler
      return next();
    } else {
      // Redirect to the dashboard if user is authenticated
      res.redirect("/dashboard");
    }
  },
};
