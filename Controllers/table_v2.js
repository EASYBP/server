const Project = require("../Models/project");
const { Response } = require("./table");

const UpdateT_v2 = async (req, res) => {
  const tab = req.body.table;
  const l = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "010",
    "011",
    "012",
  ];
  let project = await Project.findById(req.params.p, tab);

  if (project[tab]?.filter((t) => t.num === req.body.data.num)[0]) {
    project[tab][
      project[tab].findIndex((t) => t.num === parseInt(req.params.i))
    ].montant = parseFloat(req.body.data.montant.replaceAll(" ","").replace(",", "."));
    project[tab][
      project[tab].findIndex((t) => t.num === parseInt(req.params.i))
    ].echeance = req.body.data.echeance;
    l.map((f) => {
      project[tab][
        project[tab].findIndex((t) => t.num === parseInt(req.params.i))
      ][f] = parseFloat(req.body.data[f].replaceAll(" ","").replace(",", "."));
    });
  } else {
    const d = req.body.data;

    d.montant = parseFloat(d.montant.toString().replaceAll(" ","").replace(",", "."));
    for (let i of l) {
      d[i] = parseFloat(d[i].toString().replaceAll(" ","").replace(",", "."));
    }
    project[tab].push(d);
  }
  const item = project[tab].id(req.params.i);
  project.save((err) => Response(err, res, item));
};

module.exports = { UpdateT_v2 };
