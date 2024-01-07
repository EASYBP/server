const { AddFolder, GetFolder } = require("../Controllers/folder");

const router = require("express").Router();

router.post("/add", AddFolder);
router.get("/get", GetFolder);

module.exports = router;
