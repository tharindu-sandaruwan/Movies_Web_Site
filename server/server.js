const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected!"))
  .catch(err => console.log(err));

app.use("/api/movies", require("./routes/MovieRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));