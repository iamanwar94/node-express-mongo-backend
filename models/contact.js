const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
