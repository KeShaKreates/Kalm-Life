// Import the JournalPost model
const JournalPost = require("../models/JournalPost");

// Exporting an object with methods related to journal posts
module.exports = {
  // Method to get user profile and associated journal posts
  getProfile: async (req, res) => {
    try {
      // Find journal posts associated with the user
      const journalposts = await JournalPost.find({ user: req.user.id });
      // Render the profile.ejs template with journal posts and user information
      res.render("profile.ejs", { journalposts: journalposts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Method to get journal entries associated with the user
  getJournalentries: async (req, res) => {
    try {
      // Find journal posts associated with the user, sorted by creation date in descending order
      const journalposts = await JournalPost.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      // Render the journalentries.ejs template with journal posts and user information
      res.render("journalentries.ejs", { journalposts: journalposts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Method to get a specific journal post by ID
  getJournalPost: async (req, res) => {
    try {
      // Find the journal post by ID
      const journalpost = await JournalPost.findById(req.params.id);
      // Render the journalpost.ejs template with the specific journal post and user information
      res.render("journalpost.ejs", { journalpost: journalpost, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Method to create a new journal post
  createJournalPost: async (req, res) => {
    try {
      // Create a new journal post with the provided data
      await JournalPost.create({
        title: req.body.title,
        caption: req.body.caption,
        favorite: req.body.favorite,
        user: req.user.id,
      });
      console.log("Journal post has been added!");
      // Redirect to the journal entries page
      res.redirect("/journalentries");
    } catch (err) {
      console.log(err);
    }
  },

  // Method to mark a journal post as a favorite
  favoriteJournalPost: async (req, res) => {
    try {
      const userId = req.user.id;

      // Find the journal post by ID
      const journalpost = await JournalPost.findById(req.params.id);

      // Check if the user has already favorited this post
      const hasFavorited = journalpost.favorite && journalpost.favorite.includes(userId);

      if (!hasFavorited) {
        // Set favorite to true and add user ID to the favorite array
        journalpost.favorite.push(userId);
        // Save the updated journal post
        await journalpost.save();
        console.log("Marked as favorite");
      } else {
        console.log("Already marked as favorite by this user");
      }

      // Redirect to the specific journal post
      res.redirect(`/journalpost/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  },

  // Method to get journal posts favorited by the user
  getfavoriteJournalPost: async (req, res) => {
    try {
      const userId = req.user.id;

      // Find journal posts favorited by the current user
      const favoritePosts = await JournalPost.find({ favorite: userId });

      // Handle the fetched data as needed

    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  },

  // Method to delete a journal post by ID
  deleteJournalPost: async (req, res) => {
    try {
      // Find the journal post by ID
      let post = await JournalPost.findById({ _id: req.params.id });
      // Delete the journal post from the database
      await JournalPost.remove({ _id: req.params.id });
      console.log("Deleted Journal Post");
      // Redirect to the journal entries page
      res.redirect("/journalentries");
    } catch (err) {
      // Handle errors and redirect to the journal entries page
      res.redirect("/journalentries");
    }
  },
};
