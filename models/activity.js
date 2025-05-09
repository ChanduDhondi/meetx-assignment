const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
