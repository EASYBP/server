const mongoose = require("mongoose");

const t1Model = new mongoose.Schema({
  name: String,
  bp1: String,
  bp2: String,
  bp3: String,
  bp4: String,
  pf: String,
  date: { type: Date, default: Date.now },
});

const t5Model = new mongoose.Schema({
  compte: { type: Number, required: true },
  intitule: String,
  debit: Number,
  credit: Number,
});
const t6Model = new mongoose.Schema({
  i: Number,
  num: { type: Number, required: true },
  title: String,
  value: Number,
});

const t14Model = new mongoose.Schema({
  i: Number,
  num: { type: Number, required: true },
  title: String,
  d: Number,
  e: Number,
});
const t16Model = new mongoose.Schema({
  i: Number,
  num: Number,
  title: String,
  montant: Number,
  echeance: String,
  "01": Number,
  "02": Number,
  "03": Number,
  "04": Number,
  "05": Number,
  "06": Number,
  "07": Number,
  "08": Number,
  "09": Number,
  "010": Number,
  "011": Number,
  "012": Number,
});

const A2Model = new mongoose.Schema({
  title: String,
  id: Number,
  comptes: [
    {
      num: Number,
      title: String,
      commentaire: String,
      taux: Number,
      annee: [
        [
          {
            ht: Number,
            tva: Number,
            tcc: Number,
          },
        ],
      ],
    },
  ],
});
const A2Model2 = new mongoose.Schema({
  title: String,
  id: Number,
  comptes: [
    [
      {
        num: Number,
        title: String,
        commentaire: String,
        taux: Number,
        annee: [
          [
            {
              ht: Number,
              tva: Number,
              tcc: Number,
            },
          ],
        ],
      },
    ]
  ],
});
//test
const A2Model2_2_table_item={
  n1: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n2: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n3: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n4: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n5: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n6: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n7: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n8: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n9: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n10: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n11: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  n12: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) }

}
const A2Model2_2_table = [
  A2Model2_2_table_item,
  A2Model2_2_table_item,
  A2Model2_2_table_item,
  A2Model2_2_table_item
]

const A2Model2_2 = new mongoose.Schema({
  title: String,
  personne: { default: 0, type: Number, set: (v) => parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  hypothese: { default: 0, type: Number, set: (v) =>!v?0: parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  charge: { default: 0, type: Number, set: (v) =>!v?0:parseFloat(v.toString().replaceAll(" ", "").replace(",", ".")) },
  values: A2Model2_2_table,
  extra: {
    "1": { hypothese: String, values: A2Model2_2_table },
    "2": { hypothese: String, values: A2Model2_2_table },
    "3": { hypothese: String, values: A2Model2_2_table },
    "4": { hypothese: String, values: A2Model2_2_table },
    "5": { hypothese: String, values: A2Model2_2_table },
    "6": { hypothese: String, values: A2Model2_2_table }
  }
});



module.exports = { t1Model, t5Model, t6Model, t14Model, t16Model, A2Model, A2Model2, A2Model2_2 };
