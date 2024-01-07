const { SignUp, Login } = require("../Controllers/auth");

const router = require("express").Router();

router.post("/signup", SignUp);
router.get("/login", Login);
module.exports = router;
