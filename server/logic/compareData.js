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

//tworzę listę unikalnych adresów z tą samą ulicą i numerem, dodaje klucz liczba_meldunków
let jsonObject2 = newWgo.map(JSON.stringify);
let uniqueWgo = new Set(jsonObject2);
let uniqueWgoStreets = Array.from(uniqueWgo).map(JSON.parse).map((osoby, roznica, meldunki) => ({...osoby, roznica, meldunki, osoby: 0, roznica: 0, meldunki: 0}));

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
}}}

//Pętla dla ulic/numerów, które nie występują w bazie WGO, a występują w bazie Elud
for (var i = 0; i < unique.length; i++) {
    if (uniqueWgoStreets.map(x => { return x.ulica; }).indexOf(unique[i].ulica) === -1 ||  (uniqueWgoStreets.map(x => { return x.ulica; }).indexOf(unique[i].ulica) !== -1 && uniqueWgoStreets.map(x => { return x.nr; }).indexOf(unique[i].nr) === -1 ))
        {uniqueWgoStreets.push({nr: unique[i].nr,
                              ulica: unique[i].ulica,
                              osoby: 0,
                              roznica:  unique[i].liczba_meldunków,
                              meldunki: unique[i].liczba_meldunków})
}};

// console.log('Wynik WGO: ', uniqueWgoStreets);
return uniqueWgoStreets;

}

module.exports = { compareData };