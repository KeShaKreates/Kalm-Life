// Exporting an object with methods related to the index route
module.exports = {
  // Method to handle the index route
  getIndex: (req, res) => {
    // Render the index.ejs template
    res.render("index.ejs");
  },
};
