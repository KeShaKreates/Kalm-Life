const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Use mongoose to connect to the database using the provided connection string
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    // Log a successful connection message along with the host information
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error(err);
    
    // Exit the process with a non-zero status code to indicate an error
    process.exit(1);
  }
};

// Export the connectDB function to be used elsewhere in the application
module.exports = connectDB;
