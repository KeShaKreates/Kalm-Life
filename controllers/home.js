 // Exporting an object with methods related to the home route
module.exports = {
  // Method to handle the "/home" route
  getHome: ("/home", async (req, res) => {
    try {
      // Fetch a quote from the ZenQuotes API
      const response = await fetch("https://zenquotes.io/api/today");
      const data = await response.json();

      // Extract the quote and author from the fetched data
      const quote = data[0].q;
      const author = data[0].a;

      // Render the home.ejs template and pass the quote and author as data
      res.render("home", { quote, author });
    } catch (error) {
      // Log and handle errors
      console.error("Error fetching Zen quote:", error);
      res.status(500).send("Error fetching Zen quote");
    }
  }),
};
