const Project = require("../Models/project");

const Response = (err, res, data) => {
  if (err) {
    console.log(err);
    res.sendStatus(400);
  } else {
    res.status(200).json(data);
  }
};

const AddT1 = async (req, res) => {
  const project = await Project.findById(req.params.id, "t1");
  project.t1.push(req.body);
  project.save((err) => Response(err, res, project.t1[project.t1.length - 1]));
};

const UpdateT1 = async (req, res) => {
  let project = await Project.findById(req.params.p, "t1");
  delete req.body.cr;
  Object.assign(project.t1.id(req.params.i), req.body);
  const item = project.t1.id(req.params.i);
  project.save((err) => Response(err, res, item));
};

const DeleteT1 = async (req, res) => {
  let project = await Project.findById(req.params.p, "t1");
  project.t1.pull(req.params.i);
  project.save((err) => Response(err, res));
};
const AddT2 = async (req, res) => {
  const project = await Project.findById(req.params.id, "t2");
  project.t2.push(req.body);
  project.save((err) => Response(err, res, project.t2[project.t2.length - 1]));
};

const UpdateT2 = async (req, res) => {
  let project = await Project.findById(req.params.p, "t2");
  delete req.body.cr;

  Object.assign(project.t2.id(req.params.i), req.body);
  const item = project.t2.id(req.params.i);
  project.save((err) => Response(err, res, item));
};

const DeleteT2 = async (req, res) => {
  let project = await Project.findById(req.params.p, "t2");
  project.t2.pull(req.params.i);
  project.save((err) => Response(err, res));
};

const ImportT5 = async (req, res) => {
  const getValue = (item) => {
    const s = item.compte.toString();
    if (s.startsWith("1") || s.startsWith("4") || s.startsWith("55")) {
      return item.credit - item.debit;
    }
    if (
      regle({ start: 21, end: 27, compte: s }) ||
      regle({ start: 31, end: 38, compte: s }) ||
      s.startsWith("51")
    )
      return item.debit - item.credit;
    if (
      regle({ start: 28, end: 29, compte: s }) ||
      regle({ start: 39, end: 39, compte: s }) ||
      s.startsWith("59")
    ) {
      return item.debit - item.credit;
    }
    return item.credit - item.debit;
  };
  const regle = ({ start, end, compte }) => {
    function range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    }
    return range(start, end).some((e) =>
      compte.toString().startsWith(e.toString())
    );
  };

  const project = await Project.findById(req.params.p, "t5");
  project.t5 = [...req.body.comptes];

  const bp = req.body.bp;
  for (let index = 0; index < bp.length; index++) {
    const temp = req.body.comptes
      .filter((t) => t.compte.toString().startsWith(bp[index].num.toString()))
      .map((t) => getValue(t));

    bp[index].value = temp.length == 0 ? 0 : temp.reduce((a, b) => a + b);
  }
  project.t6 = [...bp];
  //////

  const bp2 = req.body.bp2;
  for (let index = 0; index < bp2.length; index++) {
    const temp = req.body.comptes
      .filter((t) => t.compte.toString().startsWith(bp2[index].num.toString()))
      .map((t) => getValue(t));

    bp2[index].value = temp.length == 0 ? 0 : temp.reduce((a, b) => a + b);
  }
  project.t7 = [...bp2];
  //////
  project.save((err) => Response(err, res));
};

const UpdateT6 = async (req, res) => {
  const tab = req.body.table;

  let project = await Project.findById(req.params.p, tab);
  if (project[tab]?.filter((t) => t.num === req.body.data.num)[0]) {
    project[tab][
      project[tab].findIndex((t) => t.num === parseInt(req.params.i))
    ].value = parseFloat(req.body.data.value.replace(",", "."));
  } else {
    const d = req.body.data;

    d.value = parseFloat(d.value.toString().replace(",", "."));
    project[tab].push(d);
  }
  const item = project[tab].id(req.params.i);
  project.save((err) => Response(err, res, item));
};

module.exports = {
  AddT1,
  UpdateT1,
  DeleteT1,
  AddT2,
  UpdateT2,
  DeleteT2,
  ImportT5,
  UpdateT6,
  Response,
};
