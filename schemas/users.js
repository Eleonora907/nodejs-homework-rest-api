const Joi = require("joi");

const { emailRegexp } = require("../constants/user-constants");

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
};
