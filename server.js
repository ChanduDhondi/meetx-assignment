require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const appRouter = require("./routes/appRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use("/api", appRouter);

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`App is running on Port: ${process.env.PORT || 8000}`);
});
