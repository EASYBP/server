const {
  AddT1,
  UpdateT1,
  DeleteT1,
  AddT2,
  UpdateT2,
  DeleteT2,
  ImportT5,
  UpdateT6,
} = require("../Controllers/table");
const { UpdateT14 } = require("../Controllers/table_2");
const { UpdateA2, AddA2, DeleteA2 } = require("../Controllers/table_a2");
const { AddRowAS1, DeleteRowAS1,PutRowAS1 } = require("../Controllers/table_as");
const { UpdateT_v2 } = require("../Controllers/table_v2");

const router = require("express").Router();

router.post("/t1/:id", AddT1);
router.put("/t1/:p/:i", UpdateT1);
router.delete("/t1/:p/:i", DeleteT1);
router.post("/t2/:id", AddT2);
router.put("/t2/:p/:i", UpdateT2);
router.delete("/t2/:p/:i", DeleteT2);
router.post("/t5/:p", ImportT5);
router.put("/t6/:p/:i", UpdateT6);
router.put("/t14/:p/:i", UpdateT14);
router.put("/t_v2/:p/:i", UpdateT_v2);
router.put("/a2/:p/:s/:c", UpdateA2);
router.post("/a2/add/:add/:p/:s", AddA2);
router.post("/annexe_special/:p",AddRowAS1)
router.delete("/annexe_special/:p/:l",DeleteRowAS1)
router.put("/annexe_special/:p/:l",PutRowAS1)
router.put("/a2/delete/:delete/:p/:s/:c/:t", DeleteA2);
module.exports = router;
