
// const app = require('../server');
const { parentPort } = require('worker_threads');

//zliczam liczbę meldunków na nieruchomości
function prepareElud(elud) {
  return new Promise(resolve => {
    parentPort.postMessage({type: 'status', body: 'Przygotowuję dane z bazy ELUD do analizy'})
    for (var i = 0; i < elud.length; i++) {
      if (typeof elud[i].ulica === 'string') {
        elud[i].ulica =  elud[i].ulica.toUpperCase();
      }
      if (typeof elud[i].nr === 'string') {
        elud[i].nr =  elud[i].nr.toUpperCase();
      }
    }
    let newElud =  elud.map(record => ({ ulica: record.ulica, nr: record.nr }));  
    resolve(newElud)
  })
}

function prepareUniqueAddressElud(newElud) {
  return new Promise(resolve => {
    parentPort.postMessage({type: 'status', body: 'Zliczam liczbę meldunków dla każdej nieruchomości. CHWILĘ TO POTRWA....'})
    let jsonObject =  newElud.map(JSON.stringify);    
    parentPort.postMessage({type: 'status', body: '...Faza 1'})    
    let uniqueSet =  new Set(jsonObject);
    parentPort.postMessage({type: 'status', body: '......Faza 2'})
    let unique =  Array.from(uniqueSet).map(JSON.parse).map(v => ({...v, liczba_meldunków: 0}));
    parentPort.postMessage({type: 'status', body: '.........Faza 3'});

    console.time('funkcja1');
    // // console.log('Loop1: ', unique);
      // for (var i = 0; i < unique.length; i++) {
      //   for (var k = 0; k < newElud.length; k++) {
      //     if (unique[i].nr == newElud[k].nr && unique[i].ulica == newElud[k].ulica) {
      //       unique[i].liczba_meldunków++
      //     }
      //   }
      // };
    

      // for (var i = 0; i < unique.length; i++) {
      //   unique[i].liczba_meldunków = newElud.filter((obj) => obj.ulica == unique[i].ulica && obj.nr == unique[i].nr).length
      // }
      // unique.map(u => u.liczba_meldunków = newElud.filter((obj) => obj.ulica == unique.ulica && obj.nr == unique.ulica).length)
      unique.forEach(u => u.liczba_meldunków = newElud.filter((obj) => obj.ulica == u.ulica && obj.nr == u.nr).length)
      
      console.timeEnd('funkcja1');
       
       
        
      

      parentPort.postMessage({type: 'status', body: '............Faza 4'});
      // console.log('Loop2: ', unique);
      
    resolve(unique);
    })
}

function prepareWgo(wgo) {
  return new Promise(resolve => {
    parentPort.postMessage({type: 'status', body: 'Przygotowuję dane z bazy WGO do analizy'})
    for (var i = 0; i < wgo.length; i++) {
      if (typeof wgo[i].ulica === 'string') {
        wgo[i].ulica =  wgo[i].ulica.toUpperCase();
      }
    if (typeof wgo[i].nr === 'string') {
        wgo[i].nr = wgo[i].nr.toUpperCase();
      }
    }

  // console.log("Zmieniłem zapis danych w bazie WGO na duże litery");
//tworzę listę bez lokalu i innych danych
    let newWgo = wgo.map(record => ({ ulica: record.ulica, nr: record.nr }));
    resolve(newWgo)
    })
  }

  function prepareUniqueAddressWgo(newWgo) {
    return new Promise(resolve => {
      parentPort.postMessage({type: 'status', body: 'Tworzę unikalną bazę adresów z bazy WGO'})      
      let jsonObject2 = newWgo.map(JSON.stringify);
      let uniqueWgo = new Set(jsonObject2);
      let uniqueWgoStreets = Array.from(uniqueWgo).map(JSON.parse).map((osoby, roznica, meldunki, DGO) => ({...osoby, roznica, meldunki, DGO, osoby: 0, roznica: 0, meldunki: 0, DGO: ''}));
      resolve(uniqueWgoStreets)
      })
    }

  function getPersonsInWgo(uniqueWgoStreets, wgo) {
    
    return new Promise(resolve => {
      parentPort.postMessage({type: 'status', body: 'Zliczam liczbę osób zgłoszonych do DGO'})   
      console.time('funkcja2');
      for (var i = 0; i < uniqueWgoStreets.length; i++) {
        for (var k = 0; k <wgo.length; k++) {
          if (uniqueWgoStreets[i].nr === wgo[k].nr && uniqueWgoStreets[i].ulica === wgo[k].ulica && wgo[k].osoby ) {
            uniqueWgoStreets[i].osoby +=  wgo[k].osoby
          }
        }
      };
      // for (var i = 0; i < uniqueWgoStreets.length; i++) {
      //   uniqueWgoStreets[i].osoby = wgo.filter((obj) => uniqueWgoStreets[i].nr === obj.nr && uniqueWgoStreets[i].ulica === obj.ulica && obj.osoby)
      //   .reduce((sum, obj) => sum + obj.osoby, 0)
      // };
     
      // uniqueWgoStreets.forEach(u => u.osoby = wgo.filter((obj) => u.nr === obj.nr && u.ulica === obj.ulica && obj.osoby)
      //                            .reduce((sum, obj) => sum + obj.osoby, 0))

     console.timeEnd('funkcja2') 
        resolve(uniqueWgoStreets)
        })
      }

  function compareBothDatabase(uniqueWgoStreets, unique) {
    return new Promise(resolve => {
      parentPort.postMessage({type: 'status', body: 'Porównuje dane z bazy ELUD i WGO i znajduję różnice - CHWILĘ TO POTRWA'}) 
      for (var i = 0; i < uniqueWgoStreets.length; i++) {
        for (var k = 0; k <unique.length; k++) {
          if (uniqueWgoStreets[i].nr == unique[k].nr && uniqueWgoStreets[i].ulica == unique[k].ulica
          // && uniqueWgoStreets[i].osoby && unique[k].liczba_meldunków
          ) {
      
              uniqueWgoStreets[i].roznica = unique[k].liczba_meldunków - uniqueWgoStreets[i].osoby;
              uniqueWgoStreets[i].meldunki = unique[k].liczba_meldunków;
              uniqueWgoStreets[i].DGO = 'złożona deklaracja odpadowa';
              unique.splice(k,1);
              continue;
          }
        }
      }
     
      // Pętla dla ulic/numerów, które nie występują w bazie ELUD, a występują w bazie WGO
      for (var i = 0; i < uniqueWgoStreets.length; i++) {
            if (uniqueWgoStreets[i].DGO === '') {
              uniqueWgoStreets[i].roznica = uniqueWgoStreets[i].meldunki - uniqueWgoStreets[i].osoby;
              uniqueWgoStreets[i].DGO = 'złożona deklaracja odpadowa';
          }
      }
     
      // Pętla dla ulic/numerów, które nie występują w bazie WGO, a występują w bazie Elud
      for (var i = 0; i < unique.length; i++) {
            uniqueWgoStreets.push({ulica: unique[i].ulica,
                                    nr: unique[i].nr,
                                    osoby: 0,
                                    roznica:  unique[i].liczba_meldunków,
                                    meldunki: unique[i].liczba_meldunków,
                                    DGO: 'niezłożona deklaracja odpadowa'})
      }
    resolve(uniqueWgoStreets)
    })
  }
        
  async function compareData(elud, wgo, res) {
    try {
  
        // app.emitter.emit("newEvent", "Faza 1");
        let newElud = await prepareElud(elud)
        // .then(app.emitter.emit("newEvent", "Faza 2"))
        let unique = await prepareUniqueAddressElud(newElud)
        // .then(app.emitter.emit("newEvent", "Faza 3"));
        ;
        let newWgo = await prepareWgo(wgo)
        // .then(app.emitter.emit("newEvent", "Faza 4"));
        
        
        let uniqueWgoStreets = await prepareUniqueAddressWgo(newWgo)
        // app.emitter.emit("newEvent", "Faza 5");
       
        let uniqueWgoStreets2 = await getPersonsInWgo(uniqueWgoStreets, wgo);
        // app.emitter.emit("newEvent", "Faza 6");
        var uniqueWgoStreets3 = await compareBothDatabase(uniqueWgoStreets2, unique);
        parentPort.postMessage({type: 'status', body: 'DANE ZOSTAŁY PRZETWORZONE PRAWIDŁOWO! KONIEC!'})
        return uniqueWgoStreets3    
    } catch(error) {
      res.status(500).json(error);
    }
  }
  

  
module.exports = { compareData };