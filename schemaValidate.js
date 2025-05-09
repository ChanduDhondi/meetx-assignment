const Joi = require("joi");

const userJoi = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[6789]\d{9}$/)
    .required(),
});

const bookingJoi = Joi.object({
  userId: Joi.string().required(),
  activityId: Joi.string().required(),
});

module.exports = { userJoi, bookingJoi };
