const express = require("express");
const router = express.Router();
const beliefController = require("../controllers/belief");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Route to get the user's belief, ensuring authentication
router.get("/getUserBelief", ensureAuth, beliefController.getUserBelief);

// Export the router
module.exports = router;
