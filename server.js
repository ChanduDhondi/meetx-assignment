require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//routes
const appRouter = require("./routes/appRoutes.js");

const app = express();

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(express.json());
app.use("/api", appRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "You Lost. No Route Exists" });
});

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`App is running on Port: ${process.env.PORT || 8000}`);
});
