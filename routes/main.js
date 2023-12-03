const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const indexController = require("../controllers/index");
const journalpostsController = require("../controllers/journalposts");
const homeController = require("../controllers/home");
const healingController = require("../controllers/healing");
const beliefController = require("../controllers/belief");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Main Routes - simplified for now

// Home route
router.get("/", indexController.getIndex);

// Profile route, requires authentication
router.get("/profile", ensureAuth, journalpostsController.getProfile);

// Journal entries route, requires authentication
router.get("/journalentries", ensureAuth, journalpostsController.getJournalentries);

// Home route, requires authentication
router.get("/home", ensureAuth, homeController.getHome);

// Healing route, requires authentication
router.get("/healing", ensureAuth, healingController.getHealing);

// User belief route, requires authentication
router.get("/home", ensureAuth, beliefController.getUserBelief);

// Login routes
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// Logout route, requires authentication
router.get("/logout", authController.logout);

// Signup routes
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

// Export the router
module.exports = router;
