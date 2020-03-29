const Data = require('../models/Data.model');
let { compareData } = require('../logic/compareData');
var  logger = require('../utils/logger.js');

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

    let street = req.query.street;
    let number = req.query.number;
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

// exports.filterByDiff = async function (req, res) {
//   try {
//     let diff = req.params.diff;
//     const selectedUnits = await Data.find({roznica: diff});
//     res.status(200).json(await selectedUnits);
//   } catch(err) {
//     res.status(500).json(err);
//   }
// };

exports.filterByDiff = async function (req, res) {
  try {
    // let diff = req.params.diff;
    let { startAt, limit, diff } = req.query;

    startAt = parseInt(startAt);
    limit = parseInt(limit);

    const docs = await Data.find({roznica: diff}).skip(startAt).limit(limit);
    const amount = await Data.find({roznica: diff}).countDocuments();
    // console.log('DDDD: ', docs, 'WWWWWWW ', amount)
    res.status(200).json({
      docs,
      amount,
    });

  } catch(err) {
    res.status(500).json(err);
  }
};

exports.filterByDGOstatus = async function (req, res) {
  try {

    let { startAt, limit, status } = req.query;

    startAt = parseInt(startAt);
    limit = parseInt(limit);

    const docs = await Data.find({DGO: status}).skip(startAt).limit(limit);
    const amount = await Data.find({DGO: status}).countDocuments();
    // console.log('DDDD: ', docs, 'WWWWWWW ', amount)
    res.status(200).json({
      docs,
      amount,
    });

  } catch(err) {
    res.status(500).json(err);
  }
};


// exports.filterByDGOstatus = async function (req, res) {
//   try {

//     let status = req.params.status;
//     const selectedUnits = await Data.find({DGO: status});
//     // const uniqueNumbers = [...new Set(selectedStreet.map(item => item.nr))];
//     res.status(200).json(await selectedUnits);
//   } catch(err) {
//     res.status(500).json(err);
//   }

// };
//ładowanie baz danych - AdminPage

exports.updateData = async function (req, res) {
  try {
  let payload = await req.body;
  payload.wgo.forEach((element) =>{ element.osoby = parseInt(element.osoby, 10);})
  await logger.info('Pliki z danymi zostały załadowane')
  const summary = await compareData(payload.elud, payload.wgo)
  await logger.info('Dane zostały przygotowane do załadowania do mongo.db')
  await Data.deleteMany({});
  await Data.insertMany(summary, {ordered: false})
  await logger.info('Dane zostały przetworzone i załadowane bez błędów!!!')
  res.status(200).send('Dane zostały przetworzone i załadowane bez błędów!!!')

  } catch(err) {
    res.status(500).json(err);
    console.log(err)
  }
}