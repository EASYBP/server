const {
  AddProject,
  GetProjects,
  DeleteProject,
  GetOneFull,
} = require("../Controllers/project");

const router = require("express").Router();
router.post("/add", AddProject);
router.get("/get", GetProjects);
router.delete("/delete", DeleteProject);
router.get("/get/one/full", GetOneFull);

module.exports = router;
