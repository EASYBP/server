const Folder = require("../Models/folder");
const Project = require("../Models/project");

const table=[...Array(4).keys()].map(v => ({
  n1: 0,
  n2: 0,
  n3: 0,
  n4: 0,
  n5: 0,
  n6: 0,
  n7: 0,
  n8: 0,
  n9: 0,
  n10: 0,
  n11: 0,
  n12: 0,
}))
const generate = ({ num = 3 }) => [...Array(num).keys()].map(a => ({
  title: "",
  charge: 0,
  hypothese: 0,
  values: table,
  extra:{
      "1":{hypothese:"",values:table},
      "2":{hypothese:"",values:table},
      "3":{hypothese:"",values:table},
      "4":{hypothese:"",values:table},
      "5":{hypothese:"",values:table},
      "6":{hypothese:"",values:table},

  }
}))

const dataA2S1 = generate(3)

const AddProject = (req, res) => {
  Folder.findOne({ title: req.body.folderTitle })
    .then(async (f) => {
      let folder;

      if (f) {
        folder = f;
      } else {
        const temp = Folder({
          title: req.body.folderTitle,
          user: req.body.user,
        });
        await temp.save();
        folder = temp;
      }
      Project({
        title: req.body.title,
        user: req.body.user,
        folder: folder._id,
      })
        .save()
        .then(async (p) => {
          if (p) {
            
            p.t6 = [...req.body.bp];
            
            await p.save();
            res.status(200).send({ folder, project: p });
          } else res.status(400).send("Error");
        })
        .catch((e) => res.status(400).send("Error"));
    })
    .catch((e) => res.status(400).send("Error"));
};

const GetProjects = (req, res) => {
  const user = req.query.user;
  Project.find({ user })
    .then((fs) => {
   
      res.status(200).json(fs);
    })
    .catch((e) => res.status(400).send("Error"));
};

const DeleteProject = (req, res) => {
  Project.findByIdAndDelete(req.query.id)
    .then((p, e) => {
      if (e) res.status(401).send("Error");
      else res.status(200).send("Succes");
    })
    .catch((err) => res.status(400).send("Error"));
};

const GetOneFull = (req, res) => {
  Project.findById(req.query.id)
    .then(async(p) => {
   
      if (p){
        if(p.aS1.length===0){
          p.aS1=dataA2S1
          await p.save()
          
       }
       console.log(p.aS1)
        res.status(200).send(JSON.stringify(p));}
      else res.status(400).send("Project does not exist");
    })
    .catch((err) => res.status(400).send("Error"));
};
module.exports = { AddProject, GetProjects, DeleteProject, GetOneFull };
