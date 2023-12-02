const JournalPost = require("../models/JournalPost");


module.exports = {
  getProfile: async (req, res) => {
    try {
      const journalposts = await JournalPost.find({ user: req.user.id });
      res.render("profile.ejs", { journalposts: journalposts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getJournalentries: async (req, res) => {
    try {
      const journalposts = await JournalPost.find({user: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("journalentries.ejs", { journalposts: journalposts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getJournalPost: async (req, res) => {
    try {
      const journalpost = await JournalPost.findById(req.params.id);
      res.render("journalpost.ejs", { journalpost: journalpost, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createJournalPost: async (req, res) => {
    try {

      await JournalPost.create({
        title: req.body.title,
        caption: req.body.caption,
        favorite: req.body.favorite,
        user: req.user.id,
      });
      console.log("Journal post has been added!");
      res.redirect("/journalentries");
    } catch (err) {
      console.log(err);
    }
  },

// Update your controller
favoriteJournalPost: async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the journal post by ID
    const journalpost = await JournalPost.findById(req.params.id);

    // Check if the user has already favorited this post
    const hasFavorited = journalpost.favorite && journalpost.favorite.includes(userId);

    if (journalpost && journalpost.favorite) {
      const hasFavorited = journalpost.favorite.includes(userId);
    } else {
      console.log('Journal post or favorite not defined');
    }
    

    if (!hasFavorited) {
      // Set favorite to true and add user ID to the favorite array
      journalpost.favorite.push(userId);

      // Save the updated journal post
      await journalpost.save();

      console.log("Marked as favorite");
    } else {
      console.log("Already marked as favorite by this user");
    }

    res.redirect(`/journalpost/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
},


getfavoriteJournalPost: async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch only the journal posts favorited by the current user
    const favoritePosts = await JournalPost.find({ favorite: userId });

    // Handle the fetched data as needed

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
},

  deleteJournalPost: async (req, res) => {
    try {
      // Find post by id
      let post = await JournalPost.findById({ _id: req.params.id });
      // Delete post from db
      await JournalPost.remove({ _id: req.params.id });
      console.log("Deleted Journal Post");
      res.redirect("/journalentries");
    } catch (err) {
      res.redirect("/journalentries");
    }
  },
};
