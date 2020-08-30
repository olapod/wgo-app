const { parentPort, workerData, port } = require('worker_threads');
let { compareData } = require('./logic/compareData');
  

function processData(data) {
  parentPort.postMessage({type: 'status', body: 'Faza 1 - Przygotowanie danych do porównania'})
  
  return compareData(data.elud, data.wgo)
  .then((result) => {parentPort.postMessage({type: 'done', body: result}) })

  // .then(() => {process.exit()})
}

processData(workerData);
