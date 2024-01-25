const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "username required" })
    .trim()
    .min(3, { message: "username must be at least 3 characters long" })
    .max(20, { message: "username cannot be more than 20 characters" }),
  email: z
    .string({ required_error: "email required" })
    .trim()
    .email({ message: "invalid email address" }),
  phone: z
    .string({ required_error: "phone required" })
    .trim()
    .min(8, { message: "phone must be at least 8 characters long" })
    .max(20, { message: "phone cannot be more than 20 characters" }),
  password: z
    .string({ required_error: "password required" })
    .trim()
    .min(8, { message: "password must be at least 8 characters long" })
    .max(100, { message: "password cannot be more than 100 characters" }),
});

module.exports = signupSchema;
