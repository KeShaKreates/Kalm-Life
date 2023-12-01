const UserB = require("../models/User");

module.exports = {
  getUserBelief: async (req, res) => {
    try {
      // Assuming you have a UserB model with a 'belief' field
      const user = await UserB.findOne({ _id: req.user._id });
      const userBelief = user.belief;

      res.json({ belief: userBelief });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user belief' });
    }
  }
};
