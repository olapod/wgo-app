let compareData = function(elud, wgo) {
//tworzę listę bez lokalu
let newElud = elud.map(({ lokal, ...rest }) => rest);

//tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków
let jsonObject = newElud.map(JSON.stringify);
let uniqueSet = new Set(jsonObject);
let unique = Array.from(uniqueSet).map(JSON.parse).map(v => ({...v, liczba_meldunków: 0}));
//zliczam liczbę meldunków na nieruchomości
for (var i = 0; i < unique.length; i++) {
for (var k = 0; k < newElud.length; k++) {
if (unique[i].nr == newElud[k].nr && unique[i].ulica == newElud[k].ulica) {
  unique[i].liczba_meldunków++

}
}
};

//tworzę listę bez lokalu
let newWgo = wgo.map(({ lokal, osoby, ...rest }) => rest);

//tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków, DGO
let jsonObject2 = newWgo.map(JSON.stringify);
let uniqueWgo = new Set(jsonObject2);
let uniqueWgoStreets = Array.from(uniqueWgo).map(JSON.parse).map((osoby, roznica, meldunki, DGO) => ({...osoby, roznica, meldunki, DGO, osoby: 0, roznica: 0, meldunki: 0, DGO: ''}));

//zliczam liczbę osób na każdej nieruchomości
for (var i = 0; i < uniqueWgoStreets.length; i++) {
for (var k = 0; k <wgo.length; k++) {
if (uniqueWgoStreets[i].nr == wgo[k].nr && uniqueWgoStreets[i].ulica == wgo[k].ulica &&  wgo[k].osoby) {
  uniqueWgoStreets[i].osoby +=  wgo[k].osoby

}
}
};

// console.log('Co porownuje: Elud: ', unique,
//  ' Wgo: ', uniqueWgoStreets
//  )
//Porównanie wyników
for (var i = 0; i < uniqueWgoStreets.length; i++) {
  for (var k = 0; k <unique.length; k++) {
    if (uniqueWgoStreets[i].nr == unique[k].nr && uniqueWgoStreets[i].ulica == unique[k].ulica && uniqueWgoStreets[i].osoby && unique[k].liczba_meldunków) {

        uniqueWgoStreets[i].roznica = unique[k].liczba_meldunków - uniqueWgoStreets[i].osoby;
        uniqueWgoStreets[i].meldunki = unique[k].liczba_meldunków;
        uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
    }
    //sprawdz to jutro
    if (!uniqueWgoStreets[i].DGO) {
        uniqueWgoStreets[i].roznica = uniqueWgoStreets[i].meldunki - uniqueWgoStreets[i].osoby;
        uniqueWgoStreets[i].DGO = 'złożona deklaracja DGO';
    }
    // if (uniqueWgoStreets[i].ulica.indexOf(unique[k].ulica) === -1 || uniqueWgoStreets[i].ulica.indexOf(unique[k].ulica) !== -1 && uniqueWgoStreets[i].nr.indexOf(unique[k].nr) === -1) {

    //     uniqueWgoStreets.push({nr: unique[k].nr,
    //                           ulica: unique[k].ulica,
    //                           osoby: 0,
    //                           roznica:  unique[k].liczba_meldunków,
    //                           meldunki: unique[k].liczba_meldunków,
    //                           DGO: 'niezłożona deklaracja DGO'})
    // }
    // else {console.log('Check: ')}
}

}
// Pętla dla ulic/numerów, które nie występują w bazie WGO, a występują w bazie Elud
for (var i = 0; i < unique.length; i++) {
    if (uniqueWgoStreets.map(x => { return x.ulica; }).indexOf(unique[i].ulica) === -1 || uniqueWgoStreets.map(x => { return x.ulica; }).indexOf(unique[i].ulica) !== -1 && uniqueWgoStreets.map(x => { return x.nr; }).indexOf(unique[i].nr) === -1 )
        {uniqueWgoStreets.push({nr: unique[i].nr,
                              ulica: unique[i].ulica,
                              osoby: 0,
                              roznica:  unique[i].liczba_meldunków,
                              meldunki: unique[i].liczba_meldunków,
                              DGO: 'niezłożona deklaracja DGO'})
}
else {console.log('Check: ' )}
};
// console.log('Wynik WGO2: ', uniqueWgoStreets);
// for (var i = 0; i < uniqueWgoStreets.length; i++) {
//   if (unique.map(x => { return x.ulica; }).indexOf(uniqueWgoStreets[i].ulica) === -1 || unique.map(x => { return x.ulica; }).indexOf(uniqueWgoStreets[i].ulica) > -1 && unique.map(x => { return x.nr; }).indexOf(uniqueWgoStreets[i].nr) === -1 )
//       { uniqueWgoStreets[i].roznica = uniqueWgoStreets[i].meldunki - uniqueWgoStreets[i].osoby;
//         uniqueWgoStreets[i].DGO = 'nie';
//         console.log('What2: ', uniqueWgoStreets[i])
//       }};

// console.log('Wynik WGO3: ', uniqueWgoStreets);
return uniqueWgoStreets;

}

module.exports = { compareData };