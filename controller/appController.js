const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.js");
const Activity = require("../models/activity.js");
const Booking = require("../models/booking.js");

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existing = await User.findOne({ email: email });
    if (existing)
      return res.status(409).json({ error: "User already exists with Email" });

    const user = new User({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
    const response = await user.save();
    res.status(201).json({ message: "User Registered successfully", response });
  } catch (err) {
    console.log("Error while registering User", err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ message: "Required email password" });

  try {
    const data = await User.findOne({ email: email });
    if (!data)
      return res
        .status(404)
        .json({ error: `User not exists with email: ${email}` });
    const hashed = data.password;
    const response = await bcrypt.compare(password, hashed);
    if (!response)
      return res.status(404).json({ error: "Entered wrong password" });

    const token = jwt.sign(
      { email: email, id: data._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "7 days",
      }
    );
    res.status(200).json({ message: "User login successfully", token });
  } catch (err) {
    console.log("Error while login User", err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

const listActivities = async (req, res) => {
  try {
    const activity = await Activity.find();
    res.status(200).json({ activity });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ error: err.message });
  }
};

const bookActivity = async (req, res) => {
  const { userId, activityId } = req.body;
  try {
    const booking = new Booking({
      user: userId,
      activity: activityId,
    });
    const response = await booking.save();
    res.status(201).json({ response });
  } catch (err) {
    console.log("Error:", err.message);
  }
};

const getBookings = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(401).json({ message: "Required userId" });
  try {
    const bookings = await Booking.findOne({ user: userId }).populate(
      "activity"
    );
    res.status(200).json({ bookings });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, listActivities, bookActivity, getBookings };
