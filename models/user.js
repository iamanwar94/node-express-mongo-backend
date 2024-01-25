const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Timestamp } = require("mongodb");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // assuming email should be unique
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// secure password with bcryptjs

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

// function for password comparing

// userSchema.methods.comparePassword = async function () {
//   try {
//     return bcrypt.compare(password, this.password);
//   } catch (error) {
//     console.log("node => comparePassword error", error);
//   }
// };

// create JWT token

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
  } catch (error) {
    console.log("node => jwt error", error);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
