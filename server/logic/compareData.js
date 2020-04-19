
// const app = require('../server');
const { parentPort } = require('worker_threads');

function prepareElud(elud) {
  return new Promise(resolve => {
    // app.emitter.emit("newEvent", "Przygotowuję dane z bazy ELUD do analizy"); 
    // console.log("Przygotowuję dane z bazy ELUD do analizy");
    parentPort.postMessage('Przygotowuję dane z bazy ELUD do analizy')
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
    parentPort.postMessage('Zliczam liczbę meldunków dla każdej nieruchomości. CHWILĘ TO POTRWA....')
    let jsonObject =  newElud.map(JSON.stringify);
    let uniqueSet =  new Set(jsonObject);
    let unique =  Array.from(uniqueSet).map(JSON.parse).map(v => ({...v, liczba_meldunków: 0}));
      for (var i = 0; i < unique.length; i++) {
      for (var k = 0; k < newElud.length; k++) {
        if (unique[i].nr == newElud[k].nr && unique[i].ulica == newElud[k].ulica) {
        unique[i].liczba_meldunków++
      }
    }
  };
    resolve(unique)
    })
}

function prepareWgo(wgo) {
  return new Promise(resolve => {
    parentPort.postMessage('Przygotowuję dane z bazy WGO do analizy')
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
      parentPort.postMessage('Tworzę unikalną bazę adresów z bazy WGO')
      let jsonObject2 = newWgo.map(JSON.stringify);
      let uniqueWgo = new Set(jsonObject2);
      let uniqueWgoStreets = Array.from(uniqueWgo).map(JSON.parse).map((osoby, roznica, meldunki, DGO) => ({...osoby, roznica, meldunki, DGO, osoby: 0, roznica: 0, meldunki: 0, DGO: ''}));
      resolve(uniqueWgoStreets)
      })
    }

  function getPersonsInWgo(uniqueWgoStreets, wgo) {
    return new Promise(resolve => {
      parentPort.postMessage('Zliczam liczbę osób zgłoszonych do DGO')
      for (var i = 0; i < uniqueWgoStreets.length; i++) {
        for (var k = 0; k <wgo.length; k++) {
          if (uniqueWgoStreets[i].nr === wgo[k].nr && uniqueWgoStreets[i].ulica === wgo[k].ulica && wgo[k].osoby ) {
            uniqueWgoStreets[i].osoby +=  wgo[k].osoby
          }
        }
      };
      
        resolve(uniqueWgoStreets)
        })
      }

  function compareBothDatabase(uniqueWgoStreets, unique) {
    return new Promise(resolve => {
      parentPort.postMessage('Porównuje dane z bazy ELUD i WGO i znajduję różnice - CHWILĘ TO POTRWA')
      for (var i = 0; i < uniqueWgoStreets.length; i++) {
        for (var k = 0; k <unique.length; k++) {
          if (uniqueWgoStreets[i].nr == unique[k].nr && uniqueWgoStreets[i].ulica == unique[k].ulica
          // && uniqueWgoStreets[i].osoby && unique[k].liczba_meldunków
          ) {
      
              uniqueWgoStreets[i].roznica = unique[k].liczba_meldunków - uniqueWgoStreets[i].osoby;
              uniqueWgoStreets[i].meldunki = unique[k].liczba_meldunków;
              uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
              unique.splice(k,1);
              continue;
          }
        }
      }
      // console.log("Porównałem bazę Elud i WGO na podstawie tych samych adresów")
      // console.log('Po porównaniu liczba rekordów w Elud nieznalezionych w WGO: ', unique.length,
      //  ' liczb rekordów w Wgo: ', uniqueWgoStreets.length
      //  )
      // Pętla dla ulic/numerów, które nie występują w bazie ELUD, a występują w bazie WGO
      for (var i = 0; i < uniqueWgoStreets.length; i++) {
            if (uniqueWgoStreets[i].DGO === '') {
              uniqueWgoStreets[i].roznica = uniqueWgoStreets[i].meldunki - uniqueWgoStreets[i].osoby;
              uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
          }
      }
      // console.log('Odnalazłem rekordy, które nie występują w bazie ELUD, a występują w bazie WGO ')
      // console.log('Po tej operacji liczba rekordów w Elud nieznalezionych w WGO: ', unique.length,
      //  ' liczb rekordów w Wgo: ', uniqueWgoStreets.length
      //  )
      // Pętla dla ulic/numerów, które nie występują w bazie WGO, a występują w bazie Elud
      for (var i = 0; i < unique.length; i++) {
            uniqueWgoStreets.push({ulica: unique[i].ulica,
                                    nr: unique[i].nr,
                                    osoby: 0,
                                    roznica:  unique[i].liczba_meldunków,
                                    meldunki: unique[i].liczba_meldunków,
                                    DGO: 'niezłożona deklaracja DGO'})
      }
    resolve(uniqueWgoStreets)
    })
  }
        
  async function compareData(elud, wgo, res) {
    
  
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
       
        return uniqueWgoStreets3    
    
  }
  

    
  

 
// function compareData(elud, wgo) {
//   return new Promise(resolve => {
//     app.emitter.emit("newEvent", "Przygotowuję dane z bazy ELUD do analizy"); 
//   console.log("Przygotowuję dane z bazy ELUD do analizy");
//   for (var i = 0; i < elud.length; i++) {
//   if (typeof elud[i].ulica === 'string') {
//   elud[i].ulica =  elud[i].ulica.toUpperCase();
//   }
// if (typeof elud[i].nr === 'string') {
//   elud[i].nr =  elud[i].nr.toUpperCase();
//   }
//   }
//     // console.log("Zmieniłem zapis danych w bazie ELUD na duże litery");
//   //tworzę listę bez lokalu i innych danych
//   let newElud =  elud.map(record => ({ ulica: record.ulica, nr: record.nr }));
// // console.log("Usunęłem zbędne dane z bazy ELUD");
//   //tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków
//   let jsonObject =  newElud.map(JSON.stringify);
//   let uniqueSet =  new Set(jsonObject);
//   let unique =  Array.from(uniqueSet).map(JSON.parse).map(v => ({...v, liczba_meldunków: 0}));
//   // console.log("Stworzyłem listę unikalnych adresów z tą samą ulicą i numerem, dodałem klucz liczba_meldunków");
//   //zliczam liczbę meldunków na nieruchomości
//    console.log("Zliczam liczbę meldunków dla każdej nieruchomości. CHWILĘ TO POTRWA....")
//    app.emitter.emit("newEvent", "Zliczam liczbę meldunków dla każdej nieruchomości. CHWILĘ TO POTRWA...."); 
//   for (var i = 0; i < unique.length; i++) {
//   for (var k = 0; k < newElud.length; k++) {
//     if (unique[i].nr == newElud[k].nr && unique[i].ulica == newElud[k].ulica) {
//       unique[i].liczba_meldunków++
//     }
//   }
// };




//  console.log("Przygotowuję dane z bazy WGO do analizy");
//  app.emitter.emit("newEvent", "Przygotowuję dane z bazy WGO do analizy"); 
// for (var i = 0; i < wgo.length; i++) {
//   if (typeof wgo[i].ulica === 'string') {
//   wgo[i].ulica =  wgo[i].ulica.toUpperCase();
//   }
// if (typeof wgo[i].nr === 'string') {
//   wgo[i].nr = wgo[i].nr.toUpperCase();
//   }
//   }

//   // console.log("Zmieniłem zapis danych w bazie WGO na duże litery");
// //tworzę listę bez lokalu i innych danych
// let newWgo = wgo.map(record => ({ ulica: record.ulica, nr: record.nr }));
// // let newWgo = wgo.map(({ lokal, osoby, ...rest }) => rest);
// // console.log("Usunęłem zbędne dane z bazy ELUD");
// //tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków, DGO
// let jsonObject2 = newWgo.map(JSON.stringify);
// let uniqueWgo = new Set(jsonObject2);
// let uniqueWgoStreets = Array.from(uniqueWgo).map(JSON.parse).map((osoby, roznica, meldunki, DGO) => ({...osoby, roznica, meldunki, DGO, osoby: 0, roznica: 0, meldunki: 0, DGO: ''}));

// // console.log("Stworzyłem listę unikalnych adresów z tą samą ulicą i numerem w bazie WGO, dodałem klucz liczba_meldunków z bazy ELUD i klucz różnicy w meldunkach");

// console.log("Zliczam liczbę deklaracji WGO dla każdej nieruchomości. CHWILĘ TO POTRWA....")
// app.emitter.emit("newEvent", "Zliczam liczbę deklaracji WGO dla każdej nieruchomości. CHWILĘ TO POTRWA...."); 
// //zliczam liczbę osób na każdej nieruchomości
// for (var i = 0; i < uniqueWgoStreets.length; i++) {
//   for (var k = 0; k <wgo.length; k++) {
//     if (uniqueWgoStreets[i].nr === wgo[k].nr && uniqueWgoStreets[i].ulica === wgo[k].ulica && wgo[k].osoby ) {
//       uniqueWgoStreets[i].osoby +=  wgo[k].osoby
//     }
//   }
// };

// console.log("Porównuję obie bazy")
// app.emitter.emit("newEvent", "Porównuję obie bazy."); 
// //  console.log('Przed porównaniem liczba rekordów w Elud: ', unique.length,
// //  ' w Wgo: ', uniqueWgoStreets.length
// //  )

// //Porównanie wyników
// for (var i = 0; i < uniqueWgoStreets.length; i++) {
//   for (var k = 0; k <unique.length; k++) {
//     if (uniqueWgoStreets[i].nr == unique[k].nr && uniqueWgoStreets[i].ulica == unique[k].ulica
//     // && uniqueWgoStreets[i].osoby && unique[k].liczba_meldunków
//     ) {

//         uniqueWgoStreets[i].roznica = unique[k].liczba_meldunków - uniqueWgoStreets[i].osoby;
//         uniqueWgoStreets[i].meldunki = unique[k].liczba_meldunków;
//         uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
//         unique.splice(k,1);
//         continue;
//     }
//   }
// }
// // console.log("Porównałem bazę Elud i WGO na podstawie tych samych adresów")
// // console.log('Po porównaniu liczba rekordów w Elud nieznalezionych w WGO: ', unique.length,
// //  ' liczb rekordów w Wgo: ', uniqueWgoStreets.length
// //  )
// // Pętla dla ulic/numerów, które nie występują w bazie ELUD, a występują w bazie WGO
// for (var i = 0; i < uniqueWgoStreets.length; i++) {
//       if (uniqueWgoStreets[i].DGO === '') {
//         uniqueWgoStreets[i].roznica = uniqueWgoStreets[i].meldunki - uniqueWgoStreets[i].osoby;
//         uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
//     }
// }
// // console.log('Odnalazłem rekordy, które nie występują w bazie ELUD, a występują w bazie WGO ')
// // console.log('Po tej operacji liczba rekordów w Elud nieznalezionych w WGO: ', unique.length,
// //  ' liczb rekordów w Wgo: ', uniqueWgoStreets.length
// //  )
// // Pętla dla ulic/numerów, które nie występują w bazie WGO, a występują w bazie Elud
// for (var i = 0; i < unique.length; i++) {
//       uniqueWgoStreets.push({ulica: unique[i].ulica,
//                               nr: unique[i].nr,
//                               osoby: 0,
//                               roznica:  unique[i].liczba_meldunków,
//                               meldunki: unique[i].liczba_meldunków,
//                               DGO: 'niezłożona deklaracja DGO'})
// }
// console.log('Na koniec odnalazłem rekordy, które nie występują w bazie WGO, a występują w bazie Elud ')
// app.emitter.emit("newEvent", "Na koniec odnalazłem rekordy, które nie występują w bazie WGO, a występują w bazie Elud."); 

// resolve(uniqueWgoStreets)
//   })
// }

module.exports = { compareData };