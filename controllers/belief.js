const UserB = require("../models/User");

// Exporting an object with methods related to user beliefs
module.exports = {
  // Method to get user belief
  getUserBelief: async (req, res) => {
    try {
      // Find the user by their ID
      const user = await UserB.findOne({ _id: req.user._id });
      // Extract the user's belief
      const userBelief = user.belief;

      // Respond with the user's belief in JSON format
      res.json({ belief: userBelief });
    } catch (err) {
      // Log and handle errors
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user belief' });
    }
  }
};
