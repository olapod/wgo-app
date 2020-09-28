const Data = require('../models/Data.model');
require("natural-compare-lite")
// let { compareData } = require('../logic/compareData');

const app = require('../server');

const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

exports.getAllRecords = async (req, res) => {
  try {
    res.status(200).json(await Data.find().exec());
  } catch(err) {
    res.status(500).json(err);
  }
}


exports.getSummary = async (req, res) => {
  // try {
  //   res.status(200).json(await Data.find());
  // } catch(err) {
  //   res.status(500).json(err);
  // }
  try {
    // let diff = req.params.diff;
    let { startAt, limit, sort, filters } = req.query;
    console.log('Mam: ', filters)
    startAt = parseInt(startAt);
    limit = parseInt(limit);
    sort=JSON.parse(sort);
    
    // if (filters.diff) {filters.diff = {$regex: filters.DGO, $options: "$i"}}
    if(filters === undefined) {
      const docs = await Data
      .find()
      .sort(sort).collation({ locale: "pl", numericOrdering: true})
      .skip(startAt)
      .limit(limit)
      .exec();
      
      const amount = await Data.find(filters).countDocuments();
     
      res.status(200).json({
        docs,
        amount,
      });
    }
    else {     
      filters=JSON.parse(filters);
    if (filters.ulica) {filters.ulica = {$regex: filters.ulica, $options: "$i"}}
    if (filters.nr) {filters.nr = new RegExp('^' + filters.nr, 'i')}
    if (filters.DGO) {filters.DGO = new RegExp('^' + filters.DGO, 'i')}
      const docs = await Data
      .find(filters)
      .sort(sort).collation({ locale: "pl", numericOrdering: true})
      .skip(startAt)
      .limit(limit)
      .exec();
      
      const amount = await Data.find(filters).countDocuments();
     
      res.status(200).json({
        docs,
        amount,
      });
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

//filter ulica i numer
exports.getStreets = async (req, res) => {

  try {
    let streets = await Data.distinct('ulica')
    streets.sort((a,b) => a.localeCompare(b))
    res.status(200).json(streets);
  } catch(err) {
    res.status(500).json(err);
  }

};

exports.filterByStreet = async function (req, res) {
  try {

    let street = req.params.street;
    const selectedStreet = await Data.find({ulica: street});
    const uniqueNumbers = [...new Set(selectedStreet.map(item => item.nr))].sort((a,b) => a.localeCompare(b))
    const nonNumbers = uniqueNumbers.filter(function(item){
      return /^[\D*]/.test(item);
  }).sort();
  
  const numbers = uniqueNumbers.filter(function(item){
      return /^[\d]/.test(item);
  });
    // sortowanie numerów i numerów z literami
    numbers.sort(function(a, b) {
      var splitter = /^(\d+)([A-Z]*)/;
      a = a.match(splitter); b = b.match(splitter);
      var anum = parseInt(a[1], 10), bnum = parseInt(b[1], 10);
      if (anum === bnum)
        return a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0;
      return anum - bnum;     
    });
    const sortedNumbers = numbers.concat(nonNumbers)
    res.status(200).json(sortedNumbers);

  } catch(err) {
    res.status(500).json(err);
  }

};

exports.filterByStreetAndNumber = async function (req, res) {

  try {

    let street = req.query.street;
    let number = req.query.number;
    console.log('Dostaje ', req.query.street, req.query.number)
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
    // let diff = req.params.diff;
    let { startAt, limit, sort, filters } = req.query;
    
    startAt = parseInt(startAt);
    limit = parseInt(limit);
    sort=JSON.parse(sort);
    filters=JSON.parse(filters);
    if (filters.ulica) {filters.ulica = {$regex: filters.ulica, $options: "$i"}}
    if (filters.nr) {filters.nr = new RegExp('^' + filters.nr, 'i')}
    if (filters.DGO) {filters.DGO = new RegExp('^' + filters.DGO, 'i')}
    
         
      const docs = await Data
      .find(filters)
      .sort(sort).collation({ locale: "pl", numericOrdering: true})
      .skip(startAt)
      .limit(limit)
      .exec();
      
      const amount = await Data.find(filters).countDocuments();
     
      res.status(200).json({
        docs,
        amount,
      });
    // };
  
   

  } catch(err) {
    res.status(500).json(err);
  }
};

exports.filterByDGOstatus = async function (req, res) {
 
  try {
    // let diff = req.params.diff;
    let { startAt, limit, sort, filters } = req.query;
    console.log('Filtry: ', filters)
    startAt = parseInt(startAt);
    limit = parseInt(limit);
    sort=JSON.parse(sort);
    filters=JSON.parse(filters);
    if (filters.ulica) {filters.ulica = {$regex: filters.ulica, $options: "$i"}}
    if (filters.nr) {filters.nr = new RegExp('^' + filters.nr, 'i')}
    if (filters.DGO) {filters.DGO = new RegExp('^' + filters.DGO, 'i')}
    console.log('Filter: ', filters )
         
      const docs = await Data
      .find(filters)
      .sort(sort).collation({ locale: "pl", numericOrdering: true})
      .skip(startAt)
      .limit(limit)
      .exec();
      
      const amount = await Data.find(filters).countDocuments();
      console.log('Amount: ', amount)
      res.status(200).json({
        docs,
        amount,
      });
    // };
  
   

  } catch(err) {
    res.status(500).json(err);
  }
};


//ładowanie baz danych - AdminPage

exports.updateData = async function (req, res) {
  
  try {
 
    await Data.deleteMany({});
    
    let payload = req.body;
    payload.wgo.forEach((element) =>{ element.osoby = parseInt(element.osoby, 10);})
    
    app.emitter.emit("newEvent", {type: 'status', body: 'First task is done!'}); 
  
  
    let worker = new Worker(`${__dirname}/../thread.js`, {
      workerData: payload
  });

   worker.on('message',(data) => {     
     if (data.type === 'status') {
      app.emitter.emit("newEvent", data)     
     }
     else {
      // async function insertMany() {
      //   try {
      //       //  return await Data.insertMany(data.body, {ordered: false})
      //       //     // .then(() => {app.emitter.emit("newEvent", {type: 'status', body: 'Last task is done!'})})
      //       //     .then(() => {res.status(200).send('Dane zostały przetworzone i załadowane bez błędów!!!')});
      //        return Data.insertMany(data.body, {ordered: false})
      //           // .then(() => {app.emitter.emit("newEvent", {type: 'status', body: 'Last task is done!'})})
      //           .then(res => {res.status(200).send('Dane zostały przetworzone i załadowane bez błędów!!!')});
      //   } catch (err) {
      //     res.status(500).json({ err })
      //   }
      // }      
      // insertMany()
      try {
        

        console.log('Co: ', data.body[0])
        const response = Data.insertMany(data.body, {ordered: false});
        console.log("Insert Successful");
        return res.status(200).send("Operacja zakończona sukcesem");
      } catch (err) {
        return res.status(500).json({ err })
      }
      }
      
    })
    
    worker.on('error',(err) => {
        console.log(err);
    })

    worker.on('exit',(code) => {
        if(code != 0) 
            console.error(`Worker stopped with exit code ${code}`)
    })    
  } 
  catch(err) {
    res.status(500).json(err);
    console.log(err)
  }
}
