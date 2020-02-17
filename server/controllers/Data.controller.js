const Data = require('../models/Data.model');
let { compareData } = require('../logic/compareData');

exports.getSummary = async (req, res) => {

  try {
    res.status(200).json(await Data.find());
  } catch(err) {
    res.status(500).json(err);
  }

};

exports.getStreets = async (req, res) => {

  try {
    res.status(200).json(await Data.distinct('ulica'));
  } catch(err) {
    res.status(500).json(err);
  }

};

exports.updateData = async function (req, res) {
  try {
  let payload = req.body;
  payload.wgo.forEach((element) =>{ element.osoby = parseInt(element.osoby, 10);})
  const summary = compareData(payload.elud, payload.wgo)

  await Data.deleteMany({});
  await Data.insertMany(summary, {ordered: false})

  res.status(200).send('Database updated successfully')

  } catch(err) {
    res.status(500).json(err);
  }
}