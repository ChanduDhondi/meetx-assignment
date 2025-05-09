const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Booking = require("./booking");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [3, "Name greaterthan 2 characters"],
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: [true, "Email is requied"],
    unique: true,
  },
  password: {
    type: String,
    requied: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[6789]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, "Phone Number is required"],
    unique: true,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Booking.deleteMany({ user: doc._id });
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
