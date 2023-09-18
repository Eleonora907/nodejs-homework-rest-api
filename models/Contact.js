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
  avatar: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

contactSchema.post("save", handleValidateError);

contactSchema.pre("findOneAndUpdate", runUpdateValidators);

contactSchema.post("findOneAndUpdate", handleValidateError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
