const Project = require("../Models/project");
const Response = (err, res, data) => {
    if (err) {
        console.log(err);
        res.sendStatus(400);
    } else {
        res.status(200).json(data);
    }
};
const table={hypothese:"",values:[...Array(4).keys()].map(v => ({
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
}))}
const newLine = (data) => {

    const obj = {
        n1: data.n1 || 0,
        n2: data.n2 || 0,
        n3: data.n3 || 0,
        n4: data.n4 || 0,
        n5: data.n5 || 0,
        n6: data.n6 || 0,
        n7: data.n7 || 0,
        n8: data.n8 || 0,
        n9: data.n9 || 0,
        n10: data.n10 || 0,
        n11: data.n11 || 0,
        n12: data.n12 || 0,
    }
    console.log(obj)
    return {
        ...data,
        extra:{
          "1":table,
          "2":table,
          "3":table,
          "4":table,
          "5":table,
          "6":table,
        },
        values: [obj, ...[...Array(3).keys()].map(v => ({
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
        }))]
    }
}
const AddRowAS1 = async (req, res) => {

    let project = await Project.findById(req.params.p, 'aS1');

    console.log('data', req.body.data)
    console.log('AllData', req.body.data)
    if (project['aS1'].length == 0) {
        console.log('first time')
        project['aS1'] = [...req.body.allData, newLine(req.body.data)]
    } else {
        const line = newLine(req.body.data)
        console
        project['aS1'].push(line)
    }

    project.save((err) => Response(err, res, project['aS1']));
}
//test


const DeleteRowAS1 = async (req, res) => {
    let project = await Project.findById(req.params.p, 'aS1');
    console.log('params', req.params)
    project['aS1'] = project['aS1'].filter((f) => f._id != req.params.l)

    project.save((err) => Response(err, res, project['aS1']));
}

const PutRowAS1 = async (req, res) => {
    let project = await Project.findById(req.params.p, 'aS1');

    const tab = req.body.tab
//test
console.log('req.body.indexP', req.body.indexP)
    for (let i = 0; i < project['aS1'].length; i++) {
        if (project['aS1'][i]._id == req.params.l) {
          
            if(req.body.indexP){
                project['aS1'][i].extra[`${req.body.indexP}`] = { ...req.body.data, values:req.body.data.values.map((v,i)=>{
                    return i!==tab?v:{
                        n1: req.body.data.n1 || 0,
                        n2: req.body.data.n2 || 0,
                        n3: req.body.data.n3 || 0,
                        n4: req.body.data.n4 || 0,
                        n5: req.body.data.n5 || 0,
                        n6: req.body.data.n6 || 0,
                        n7: req.body.data.n7 || 0,
                        n8: req.body.data.n8 || 0,
                        n9: req.body.data.n9 || 0,
                        n10: req.body.data.n10 || 0,
                        n11: req.body.data.n11 || 0,
                        n12: req.body.data.n12 || 0,
                    }
                })}
            }else{

            const {charge,hypothese}=req.body.data
            console.log('charge :>> ', charge);
            console.log('hypothese :>> ', hypothese);
            project['aS1'][i] = { ...req.body.data,charge,hypothese, values:req.body.data.values.map((v,i)=>{
                return i!==tab?v:{
                    n1: req.body.data.n1 || 0,
                    n2: req.body.data.n2 || 0,
                    n3: req.body.data.n3 || 0,
                    n4: req.body.data.n4 || 0,
                    n5: req.body.data.n5 || 0,
                    n6: req.body.data.n6 || 0,
                    n7: req.body.data.n7 || 0,
                    n8: req.body.data.n8 || 0,
                    n9: req.body.data.n9 || 0,
                    n10: req.body.data.n10 || 0,
                    n11: req.body.data.n11 || 0,
                    n12: req.body.data.n12 || 0,
                }
            })}
        }

        }
    }

    project.save((err) => Response(err, res, project['aS1']));
}
module.exports = { AddRowAS1, DeleteRowAS1, PutRowAS1 }