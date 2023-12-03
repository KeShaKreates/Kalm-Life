const Belief = require("../models/User");

    // Exporting an object with methods related to healing
    module.exports = {
      // Method to get healing information based on user beliefs
      getHealing: async (req, res) => {
        try {
          // Find beliefs associated with the current user
          const beliefs = await Belief.find({ user: req.user.belief });
    
          // Render the healing page with beliefs and user information
          res.render("healing.ejs", { beliefs: beliefs, user: req.user });
        } catch (err) {
          // Log and handle errors
          console.error(err);
        }
      },
    };
    