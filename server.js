require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//routes


const app = express();

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(bodyParser.json());
app.use('/api', )

app.all("*", (req, res) => {
  res.status(404).json({ message: "You Lost. No Route Exists" });
});

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`App is running on Port: ${process.env.PORT || 8000}`);
});
