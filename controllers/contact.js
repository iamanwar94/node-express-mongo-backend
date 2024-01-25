const Contact = require("../models/contact");

const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const data = await Contact.create({ name, email, message });
    res.status(200).json({ message: "we have received your message" });
  } catch (error) {
    next(error);
  }
};

module.exports = contact;
