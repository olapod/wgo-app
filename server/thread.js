const { parentPort, workerData, port } = require('worker_threads');
let { compareData } = require('./logic/compareData');
  
// parentPort.postMessage('Faza 1 - Przygotowanie danych do porównania')
// const payload = workerData;

// parentPort.postMessage('Faza 2 - Rozpoczynam fazę analizy danych');

// const finalData = compareData(payload.elud, payload.wgo)


// finalData
// .then(data => {
//   parentPort.postMessage(data);
//   // parentPort.close();
// })

function processData(data) {
  parentPort.postMessage({type: 'status', body: 'Faza 1 - Przygotowanie danych do porównania'})
  
  return compareData(data.elud, data.wgo)
  .then((result) => {parentPort.postMessage({type: 'done', body: result}) })
  .then(() => {process.exit()})
}

processData(workerData);
