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

// app.emitter.emit("newEvent", "Faza 1");
// console.log('Co: ', payload);
parentPort.postMessage('Faza 2 - Rozpoczynam fazę analizy danych');
const finalData = compareData(payload.elud, payload.wgo)
finalData.then(data => {
  const summary = data;
  console.log('What: ', summary.length)
  Data.insertMany(summary, {ordered: false});
  parentPort.postMessage('Faza 4 - Zapisanie danych w nowej bazie danych. Wszystko gra :)')
}) 
// Data.insertMany(finalData, {ordered: false})

// finalData.then(data => {
//     parentPort.postMessage('Faza 3 - Przygotowanie danych do zapisania');
//     const summary = data;
    
    
//     // process.exit() 
// });