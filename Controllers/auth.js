const User = require("../Models/user");

const SignUp = (req, res) => {
  const email = req.body.email;
  User.findOne({ email })
    .then((u) => {
      if (u) res.status(400).send("User exist");
      else {
        User(req.body)
          .save()
          .then((u) => {
            res.status(200).send(JSON.stringify(u));
          });
      }
    })
    .catch((e) => res.status(400).send("Error"));
};

const Login = (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  User.findOne({ email, password })
    .then((u) => {
      if (u) res.status(200).send(JSON.stringify(u));
      else res.status(400).send("User invalid");
    })
    .catch((e) => res.status(400).send("Error"));
};
module.exports = { SignUp, Login };
