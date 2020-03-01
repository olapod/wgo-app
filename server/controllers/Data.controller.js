const Data = require('../models/Data.model');
let { compareData } = require('../logic/compareData');

exports.getSummary = async (req, res) => {
  try {
    res.status(200).json(await Data.find());
  } catch(err) {
    res.status(500).json(err);
  }
};

//filter ulica i numer
exports.getStreets = async (req, res) => {

  try {
    res.status(200).json(await Data.distinct('ulica'));
  } catch(err) {
    res.status(500).json(err);
  }

};

exports.filterByStreet = async function (req, res) {
  try {

    let street = req.params.street;
    const selectedStreet = await Data.find({ulica: street});
    const uniqueNumbers = [...new Set(selectedStreet.map(item => item.nr))];
    res.status(200).json(await uniqueNumbers);

  } catch(err) {
    res.status(500).json(err);
  }

};

exports.filterByStreetAndNumber = async function (req, res) {
  try {

    let street = req.params.street;
    let number = req.params.number;
    const selectedItem = await Data.findOne({ulica: street, nr: number});
    // const uniqueNumbers = [...new Set(selectedStreet.map(item => item.nr))];
    res.status(200).json(await selectedItem);
  } catch(err) {
    res.status(500).json(err);
  }

};
//filter różnica w DGO i meldunkach
exports.getDiff = async (req, res) => {

  try {
    res.status(200).json(await Data.distinct('roznica'));
  } catch(err) {
    res.status(500).json(err);
  }

};

exports.filterByDiff = async function (req, res) {
  try {

    let diff = req.params.diff;
    const selectedUnits = await Data.find({roznica: diff});
    // const uniqueNumbers = [...new Set(selectedStreet.map(item => item.nr))];
    res.status(200).json(await selectedUnits);
  } catch(err) {
    res.status(500).json(err);
  }

};

exports.filterByDGOstatus = async function (req, res) {
  try {

    let status = req.params.status;
    const selectedUnits = await Data.find({DGO: status});
    // const uniqueNumbers = [...new Set(selectedStreet.map(item => item.nr))];
    res.status(200).json(await selectedUnits);
  } catch(err) {
    res.status(500).json(err);
  }

};
//ładowanie baz danych - AdminPage

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