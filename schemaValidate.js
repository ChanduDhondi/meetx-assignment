const Joi = require("joi");

const userJoi = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
    .required(),
  password: Joi.string().required(),
  phone: Joi.string.pattern(new RegExp("^[6789]d{9}$")),
});

const bookingJoi = Joi.object({
  user: Joi.string().required(),
  activity: Joi.string().required(),
});

module.exports = { userJoi, bookingJoi, activityJoi };
