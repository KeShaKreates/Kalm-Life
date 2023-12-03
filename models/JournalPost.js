const mongoose = require("mongoose");

// Define the schema for a journal post
const JournalPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  favorite: [
    {
      type: String,
      required: true,
    }
  ],  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the JournalPost model using the defined schema
module.exports = mongoose.model("JournalPost", JournalPostSchema);
