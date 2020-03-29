var  logger = require('../utils/logger.js');

let compareData = async function(elud, wgo) {
await logger.info("Przygotowuję dane z bazy ELUD do analizy");
  for (var i = 0; i < elud.length; i++) {
  if (typeof elud[i].ulica === 'string') {
  elud[i].ulica = await elud[i].ulica.toUpperCase();
  }
if (typeof elud[i].nr === 'string') {
  elud[i].nr = await elud[i].nr.toUpperCase();
  }
  }
  // logger.info("Zmieniłem zapis danych w bazie ELUD na duże litery");
  //tworzę listę bez lokalu i innych danych
  let newElud = await elud.map(record => ({ ulica: record.ulica, nr: record.nr }));
// logger.info("Usunęłem zbędne dane z bazy ELUD");
  //tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków
  let jsonObject = await newElud.map(JSON.stringify);
  let uniqueSet = await new Set(jsonObject);
  let unique = await Array.from(uniqueSet).map(JSON.parse).map(v => ({...v, liczba_meldunków: 0}));
  // logger.info("Stworzyłem listę unikalnych adresów z tą samą ulicą i numerem, dodałem klucz liczba_meldunków");
  //zliczam liczbę meldunków na nieruchomości
  await logger.info("Zliczam liczbę meldunków dla każdej nieruchomości. CHWILĘ TO POTRWA....")
  for (var i = 0; i < unique.length; i++) {
  for (var k = 0; k < newElud.length; k++) {
    if (unique[i].nr == newElud[k].nr && unique[i].ulica == newElud[k].ulica) {
     await unique[i].liczba_meldunków++
    }
  }
};




await logger.info("Przygotowuję dane z bazy WGO do analizy");

for (var i = 0; i < wgo.length; i++) {
  if (typeof wgo[i].ulica === 'string') {
  wgo[i].ulica = await wgo[i].ulica.toUpperCase();
  }
if (typeof wgo[i].nr === 'string') {
  wgo[i].nr = wgo[i].nr.toUpperCase();
  }
  }

  // logger.info("Zmieniłem zapis danych w bazie WGO na duże litery");
//tworzę listę bez lokalu i innych danych
let newWgo = wgo.map(record => ({ ulica: record.ulica, nr: record.nr }));
// let newWgo = wgo.map(({ lokal, osoby, ...rest }) => rest);
// logger.info("Usunęłem zbędne dane z bazy ELUD");
//tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków, DGO
let jsonObject2 = newWgo.map(JSON.stringify);
let uniqueWgo = new Set(jsonObject2);
let uniqueWgoStreets = Array.from(uniqueWgo).map(JSON.parse).map((osoby, roznica, meldunki, DGO) => ({...osoby, roznica, meldunki, DGO, osoby: 0, roznica: 0, meldunki: 0, DGO: ''}));

// logger.info("Stworzyłem listę unikalnych adresów z tą samą ulicą i numerem w bazie WGO, dodałem klucz liczba_meldunków z bazy ELUD i klucz różnicy w meldunkach");

logger.info("Zliczam liczbę deklaracji WGO dla każdej nieruchomości. CHWILĘ TO POTRWA....")
//zliczam liczbę osób na każdej nieruchomości
for (var i = 0; i < uniqueWgoStreets.length; i++) {
  for (var k = 0; k <wgo.length; k++) {
    if (uniqueWgoStreets[i].nr === wgo[k].nr && uniqueWgoStreets[i].ulica === wgo[k].ulica && wgo[k].osoby ) {
      uniqueWgoStreets[i].osoby +=  wgo[k].osoby
    }
  }
};

logger.info("Porównuję obie bazy")

//  logger.info('Przed porównaniem liczba rekordów w Elud: ', unique.length,
//  ' w Wgo: ', uniqueWgoStreets.length
//  )

//Porównanie wyników
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
// logger.info("Porównałem bazę Elud i WGO na podstawie tych samych adresów")
// logger.info('Po porównaniu liczba rekordów w Elud nieznalezionych w WGO: ', unique.length,
//  ' liczb rekordów w Wgo: ', uniqueWgoStreets.length
//  )
// Pętla dla ulic/numerów, które nie występują w bazie ELUD, a występują w bazie WGO
for (var i = 0; i < uniqueWgoStreets.length; i++) {
      if (uniqueWgoStreets[i].DGO === '') {
        uniqueWgoStreets[i].roznica = uniqueWgoStreets[i].meldunki - uniqueWgoStreets[i].osoby;
        uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
    }
}
// logger.info('Odnalazłem rekordy, które nie występują w bazie ELUD, a występują w bazie WGO ')
// logger.info('Po tej operacji liczba rekordów w Elud nieznalezionych w WGO: ', unique.length,
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
logger.info('Na koniec odnalazłem rekordy, które nie występują w bazie WGO, a występują w bazie Elud ')

// logger.info('Po tych operacjach liczba rekordów w Elud wynosi: ', unique.length,
//  ' liczb rekordów w Wgo wynosi: ', uniqueWgoStreets.length
//  )
// const unique2 = Array.from(new Set(uniqueWgoStreets.map(x=>JSON.stringify(x)))).map(x=>JSON.parse(x));

// console.log('Co porownuje4: Elud: ', unique.length,
//  ' Wgo: ', unique2.length
//  )
return uniqueWgoStreets;

}

module.exports = { compareData };