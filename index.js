const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const AuthRouter = require("./Routes/auth");
const FolderRouter = require("./Routes/folder");
const ProjectRouter = require("./Routes/project");
const TableRouter = require("./Routes/table");
const PORT = process.env.PORT || 4000;
app.use(express.json());
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then((v) => console.log("Database connected..."))
  .catch(() => console.log("Failed to connect to Database..."));
app.use(
  cors()
  //   {
  //   origin: process.env.APP_URL || "http://localhost:3000", // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }
);

app.listen(PORT, () => console.log("Server is running..."));
app.get("/", (req, res) => res.send("Server is running..."));
app.use("/auth", AuthRouter);
app.use("/folder", FolderRouter);
app.use("/project", ProjectRouter);
app.use("/table", TableRouter);
