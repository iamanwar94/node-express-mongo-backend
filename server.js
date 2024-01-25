require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth");
const contactRouter = require("./routes/contact");
const connectDb = require("./utils/db");
const error = require("./middlewares/errors");

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);

app.use(error);

app.get("/", (req, res) => {
  console.log("node => welcome to my node backend");
  res
    .status(200)
    .send("node => welcome to my node backend and this is home page");
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`node => new server is running on port: ${PORT}`);
  });
});
