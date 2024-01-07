const Project = require("../Models/project");
const { Response } = require("./table");

const UpdateT14 = async (req, res) => {
  const tab = "t14";

  let project = await Project.findById(req.params.p, tab);
  if (project[tab]?.filter((t) => t.num === req.body.data.num)[0]) {
    project[tab][
      project[tab].findIndex((t) => t.num === parseInt(req.params.i))
    ].e = parseFloat(req.body.data.e.replace(",", "."));
    project[tab][
      project[tab].findIndex((t) => t.num === parseInt(req.params.i))
    ].d = parseFloat(req.body.data.d.replace(",", "."));
  } else {
    const d = req.body.data;

    d.d = parseFloat(d.d.toString().replace(",", "."));
    d.e = parseFloat(d.e.toString().replace(",", "."));
    project[tab].push(d);
  }
  const item = project[tab].id(req.params.i);
  project.save((err) => Response(err, res, item));
};

module.exports = { UpdateT14 };
