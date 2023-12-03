const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Define the schema for a user
const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  belief: String,
  disorders: String,
  password: String,
});

// Password hash middleware.
UserSchema.pre("save", function save(next) {
  const user = this;

  // If the password is not modified, proceed to the next middleware.
  if (!user.isModified("password")) {
    return next();
  }

  // Generate a salt and hash the password.
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // Update the user's password with the hashed version.
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// Create and export the User model using the defined schema
module.exports = mongoose.model("User", UserSchema);
