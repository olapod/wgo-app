const { parentPort, workerData } = require('worker_threads');
let { compareData } = require('./logic/compareData');
const mongoose = require('mongoose');
const Data = require('./models/Data.model');
// const app = require('../server/server');
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
        )
  .then(() => console.log('MongoDB 2 successfully connected'))
  .catch(err => console.log(err));

  
parentPort.postMessage('Faza 1 - Przygotowanie danych do porównania')
const payload = workerData;

// // app.emitter.emit("newEvent", "Faza 1");
// // console.log('Co: ', payload);
// function insertData(data) {
//   return new Promise(resolve => {
//     console.log('What: ', data.length)
//     Data.insertMany(data, {ordered: false});
//     resolve(console.log('Jest ok'));
//   })
// }

parentPort.postMessage('Faza 2 - Rozpoczynam fazę analizy danych');
const finalData = compareData(payload.elud, payload.wgo)
// finalData.then(data => {insertData(data)})
// .then(process.exit())

finalData.then(data => {
  const summary = data;
  console.log('What: ', summary.length)
  Data.insertMany(summary, {ordered: false});  
  parentPort.postMessage('Wgranie danych z obu baz zostało wykonane poprawnie!')  
})

//Popracować jeszcze nad zakmnięciem wątku po wykonanej pracy