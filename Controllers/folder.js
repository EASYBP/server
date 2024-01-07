const Folder = require("../Models/folder");
const User = require("../Models/user");

const AddFolder = (req, res) => {
  const title = req.body.title;
  const user = req.body.user;

  Folder({ title, user })
    .save()
    .then((f) => {
      if (f) res.status(200).send(JSON.stringify(f));
      else res.status(400).send("Error");
    })
    .catch((e) => res.status(400).send("Error"));
};

const GetFolder = (req, res) => {
  const user = req.query.user;
  Folder.find({ user })
    .then((fs) => {
      res.status(200).json(fs);
    })
    .catch((e) => res.status(400).send("Error"));
};
module.exports = { AddFolder, GetFolder };
