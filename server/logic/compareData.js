

let compareData = function(elud, wgo) {

  for (var i = 0; i < elud.length; i++) {
  if (typeof elud[i].ulica === 'string') {
  elud[i].ulica = elud[i].ulica.toUpperCase();
  }
if (typeof elud[i].nr === 'string') {
  elud[i].nr = elud[i].nr.toUpperCase();
  }
  }
  //tworzę listę bez lokalu i innych danych
  let newElud = elud.map(record => ({ ulica: record.ulica, nr: record.nr }));
console.log("Pętla 1");
  //tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków
  let jsonObject = newElud.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  let unique = Array.from(uniqueSet).map(JSON.parse).map(v => ({...v, liczba_meldunków: 0}));
  console.log("Pętla 2");
  //zliczam liczbę meldunków na nieruchomości
  for (var i = 0; i < unique.length; i++) {
  for (var k = 0; k < newElud.length; k++) {
    if (unique[i].nr == newElud[k].nr && unique[i].ulica == newElud[k].ulica) {
      unique[i].liczba_meldunków++
    }
  }
};




console.log("Pętla 4");

for (var i = 0; i < wgo.length; i++) {
  if (typeof wgo[i].ulica === 'string') {
  wgo[i].ulica = wgo[i].ulica.toUpperCase();
  }
if (typeof wgo[i].nr === 'string') {
  wgo[i].nr = wgo[i].nr.toUpperCase();
  }
  }
//tworzę listę bez lokalu i innych danych
let newWgo = wgo.map(record => ({ ulica: record.ulica, nr: record.nr }));
// let newWgo = wgo.map(({ lokal, osoby, ...rest }) => rest);
console.log("Pętla 5");
//tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków, DGO
let jsonObject2 = newWgo.map(JSON.stringify);
let uniqueWgo = new Set(jsonObject2);
let uniqueWgoStreets = Array.from(uniqueWgo).map(JSON.parse).map((osoby, roznica, meldunki, DGO) => ({...osoby, roznica, meldunki, DGO, osoby: 0, roznica: 0, meldunki: 0, DGO: ''}));

console.log("Pętla 6");
//zliczam liczbę osób na każdej nieruchomości
for (var i = 0; i < uniqueWgoStreets.length; i++) {
  for (var k = 0; k <wgo.length; k++) {
    if (uniqueWgoStreets[i].nr === wgo[k].nr && uniqueWgoStreets[i].ulica === wgo[k].ulica && wgo[k].osoby ) {
      uniqueWgoStreets[i].osoby +=  wgo[k].osoby
    }
  }
};

console.log("Pętla 7")

 console.log('Co porownuje1: Elud: ', unique.length,
 ' Wgo: ', uniqueWgoStreets.length
 )
console.log("Pętla 8");
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
console.log("Pętla 9");
// Pętla dla ulic/numerów, które nie występują w bazie ELUD, a występują w bazie WGO
for (var i = 0; i < uniqueWgoStreets.length; i++) {
      if (!uniqueWgoStreets[i].DGO) {
        uniqueWgoStreets[i].roznica = uniqueWgoStreets[i].meldunki - uniqueWgoStreets[i].osoby;
        uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
        // console.log('Match 2: ', uniqueWgoStreets[i]);
    }
}

console.log('Co porownuje2: Elud: ', unique.length,
 ' Wgo: ', uniqueWgoStreets.length
 )
// Pętla dla ulic/numerów, które nie występują w bazie WGO, a występują w bazie Elud
for (var i = 0; i < unique.length; i++) {
      uniqueWgoStreets.push({ulica: unique[i].ulica,
                              nr: unique[i].nr,
                              osoby: 0,
                              roznica:  unique[i].liczba_meldunków,
                              meldunki: unique[i].liczba_meldunków,
                              DGO: 'niezłożona deklaracja DGO'})
}

console.log('Co porownuje3: Elud: ', unique.length,
 ' Wgo: ', uniqueWgoStreets.length
 )
// const unique2 = Array.from(new Set(uniqueWgoStreets.map(x=>JSON.stringify(x)))).map(x=>JSON.parse(x));

// console.log('Co porownuje4: Elud: ', unique.length,
//  ' Wgo: ', unique2.length
//  )
return uniqueWgoStreets;

}

module.exports = { compareData };