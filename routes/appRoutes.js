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

router.get("/login", login);
router.post("/register", validate(userJoi), register);
router.get("/allActivities", listActivities);
router.post(
  "/bookActivity",
  authMiddleware,
  validate(bookingJoi),
  bookActivity
);
router.post("/getBookings/:userId", authMiddleware, getBookings);

module.exports = router;
