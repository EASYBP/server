const mongoose = require("mongoose");

const folderModel = new mongoose.Schema({
  title: String,
  user: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
});

const Folder = mongoose.model("Folders", folderModel);

module.exports = Folder;
