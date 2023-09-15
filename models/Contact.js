const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", handleValidateError);

contactSchema.pre("findOneAndUpdate", runUpdateValidators);

contactSchema.post("findOneAndUpdate", handleValidateError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
