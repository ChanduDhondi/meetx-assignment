const express = require("express");
const router = express.Router();

//controller
const {
  register,
  login,
  listActivities,
  bookActivity,
  getBookings,
} = require("../controller/appController.js");

//middleware
const { authMiddleware, validate } = require("../middleware.js");

//Joi validator
const { userJoi, bookingJoi } = require("../schemaValidate.js");

router.get("/getBookings/:userId", authMiddleware, getBookings);
router.get("/allActivities", listActivities);
router.post("/login", login);
router.post("/register", validate(userJoi), register);
router.post(
  "/bookActivity",
  authMiddleware,
  validate(bookingJoi),
  bookActivity
);

module.exports = router;
