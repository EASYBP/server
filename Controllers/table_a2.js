const Project = require("../Models/project");
const { Response } = require("./table");
const LIST_MOIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const LIST_ANNEE = [1, 2, 3, 4];
const decodeString = (s) =>
  parseFloat(s.toString().replaceAll(" ", "").replaceAll(",", "."));
const decodeObjectSection = (d) => ({
  ...d,
  comptes: d.comptes.map((c) => ({
    ...c,
    taux: decodeString(c.taux),
    annee: c.annee.map((a) =>
      a.map((m) => ({
        ...m,
        ht: decodeString(m.ht),
        tva: decodeString(m.tva),
        ttc: decodeString(m.ttc),
      }))
    ),
  })),
});

const DeleteA2 = async (req, res) => {
  const tab = req.body.table || req.params.t;
  const section = req.params.s;
  const compte = req.params.c;
  let project = await Project.findById(req.params.p, tab);

  switch (req.params.delete) {
    case "line":
      const conditionSection = project[tab].filter(
        (s) => s.id == parseInt(section) || s._id == section
      )[0];
      if (conditionSection) {
        const secId = project[tab].findIndex(
          (s) => s.id == parseInt(section) || s._id == section
        );
        const comptes = project[tab][secId].comptes.filter(
          (c) => c.num != compte
        );

        project[tab][secId].comptes = [...comptes];
      } else {
        const section = {
          ...req.body.section,
          comptes: req.body.section.comptes.filter(
            (c) => !c.total && c.num != compte
          ),
        };

        project[tab].push(section);
      }
      break;
    case "section":
      //remove section from Project
      //  project[tab] = project[tab].filter((s) => s._id != section);
      project[tab].splice(
        project[tab].findIndex((s) => s._id == section),
        1
      );
      break;

    default:
      break;
  }
  project.save((err) => Response(err, res, {}));
};
const compte = ({ id }) => ({
  num: id,

  title: "",
  commentaire: "",
  taux: 0,
  annee: LIST_ANNEE.map((a) => {
    return LIST_MOIS.map((i) => {
      return {
        ht: 0,
        tva: 0,
        ttc: 0,
      };
    });
  }),
});
const AddA2 = async (req, res) => {
  let result;
  const tab = req.body.table;
  const section = req.params.s;
  let project = await Project.findById(req.params.p, tab);
  switch (req.params.add) {
    case "line":
      const conditionSection = project[tab].filter(
        (s) => s.id == parseInt(section) || s._id == section
      )[0];
      if (conditionSection) {
        const secId = project[tab].findIndex(
          (s) => s.id == parseInt(section) || s._id == section
        );
        const comptes = project[tab][secId].comptes;
        result = compte({
          id: Math.max(...comptes.map((c) => c.num)) + 1,
        });

        project[tab][secId].comptes.push(result);
      } else {
        const section = {
          ...req.body.data.section,
          comptes: req.body.data.section.comptes.filter((c) => !c.total),
        };
        console.log(section);
        result = compte({
          id: Math.max(...section.comptes.map((c) => c.num)) + 1,
        });
        section.comptes.push(result);
        project[tab].push(section);
      }
      break;
    case "section":
      console.log(req.body.section);

      const i = project[tab].push(req.body.section);
      result = project[tab][i - 1];
      break;

    default:
      break;
  }
  project.save((err) => Response(err, res, result));
};

const UpdateA2 = async (req, res) => {
  const tab = req.body.table;
  let result;
  const { value, property } = req.body.data;
  const { isSection, field, annee, mois, fullData } = property;
  const compte = parseInt(req.params.c);
  const section = req.params.s;
  console.log("compte :" + compte);
  let project = await Project.findById(req.params.p, tab);
  const conditionSection = project[tab].filter(
    (s) => s.id == parseInt(section) || s._id == section
  )[0];
  if (conditionSection) {
    const secId = project[tab].findIndex(
      (s) => s.id == parseInt(section) || s._id == section
    );
    console.log("section exist", section);
    if (isSection) {
      project[tab][secId][field] = value;
    } else {
      const id = project[tab][secId].comptes.findIndex((i) => i.num == compte);
      if (project[tab][secId].comptes[id]) {
        console.log("compte exist");

        if (field !== "ht" && field !== "tva" && field !== "ttc") {
          project[tab][secId].comptes[id][field] = value;
        } else {
          project[tab][secId].comptes[id].annee[annee][mois][field] = value;
        }
      }
      // else {
      //   console.log("compte n'exist pas");
      //   project[tab][section].comptes.push(
      //     fullData.comptes.filter((f) => f._id == compte)[0]
      //   );
      // }
    }
  } else {
    //section n'existe pas
    console.log("section n'existe pas");
    const temp = UpdateValue({
      section: decodeObjectSection(fullData),
      isSection,
      annee,
      mois,
      value,
      field,
      compte,
    });

    const t = project[tab].push(temp);
    result = project[tab][t - 1];
  }

  project.save((err) => Response(err, res, result || conditionSection));
};

module.exports = { UpdateA2, AddA2, DeleteA2 };

const UpdateValue = ({
  section,
  field,
  isSection,

  annee,
  mois,
  compte,
  value,
}) => {
  section = { ...section, comptes: section.comptes.filter((c) => !c.total) };

  if (isSection) {
    section[field] = value;
  } else {
    console.log(compte);
    if (section.comptes.filter((c) => c.num == compte)[0]) {
      console.log("compte exist lorsque section non");
      const id = section.comptes.findIndex((i) => i.num == compte);
      if (field !== "ht" && field !== "tva" && field !== "ttc") {
        section.comptes[id][field] = value;
      } else {
        section.comptes[id].annee[annee][mois][field] = value;
      }
    }
  }
  return section;
};
