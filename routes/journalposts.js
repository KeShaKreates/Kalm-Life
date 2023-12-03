const express = require("express");
const router = express.Router();
const journalpostsController = require("../controllers/journalposts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Route to get a specific journal post by ID, ensuring authentication
router.get("/:id", ensureAuth, journalpostsController.getJournalPost);

// Route to get journal posts favorited by the user
router.get("/getfavoriteJournalPost/:id", journalpostsController.getfavoriteJournalPost);

// Route to create a new journal post
router.post("/createJournalPost", journalpostsController.createJournalPost);

// Route to mark a journal post as a favorite
router.put("/favoriteJournalPost/:id", journalpostsController.favoriteJournalPost);

// Route to delete a journal post by ID
router.delete("/deleteJournalPost/:id", journalpostsController.deleteJournalPost);

// Export the router
module.exports = router;
