const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000; // Or any available port

// Enable CORS to allow requests from your front end
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Route to send the API key (this will be fetched from the frontend)
app.get("/apikey", (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
