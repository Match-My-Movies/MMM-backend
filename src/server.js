require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose'); // MongoDB ORM
const app = require('./app'); // Import Express app

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
