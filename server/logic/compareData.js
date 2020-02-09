//DANE ELUD
// let elud = [{
//     nr: 12,
//     lokal: 3,
//     ulica: 'ul. Sobieskiego',
// },
// {
//     nr: 12,
//   lokal: 4,
//     ulica: 'ul. toto',
// },
// {
//     nr: 45,
//   lokal: 3,
//     ulica: 'ul. tutu',
// },
// {
//     nr: 42,
//   lokal: 2,
//     ulica: 'ul. tutu',
// },
//         {
//     nr: 42,
//   lokal: 2,
//     ulica: 'ul. tutu',
// },
//         {
//     nr: 43,
//   lokal: 2,
//     ulica: 'ul. tutu',
// },
// {
//     nr: 43,
//   lokal: 6,
//     ulica: 'ul. tutu',
// },
//         {
//     nr: 12,
//   lokal: 7,
//     ulica: 'ul. Sobieskiego',
// },
// ];
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
// console.log('Wynik ELUD: ', unique);



//Dane WGO
// let wgo = [{
//     nr: 12,
//     lokal: '',
//     ulica: 'ul. Sobieskiego',
//     osoby: 4
// },
// {
//     nr: 12,
//   lokal: 4,
//     ulica: 'ul. toto',
//   osoby: 2
// },
// {
//     nr: 45,
//   lokal: 3,
//     ulica: 'ul. tutu',
//   osoby: 1
// },
// {
//     nr: 42,
//   lokal: 2,
//     ulica: 'ul. tutu',
//   osoby: 10
// },
//         {
//     nr: 42,
//   lokal: 2,
//     ulica: 'ul. tutu',
//     osoby: 5
// },
//         {
//     nr: 43,
//   lokal: 2,
//     ulica: 'ul. tutu',
// },
// {
//     nr: 43,
//   lokal: '',
//     ulica: 'ul. tutu',
//   osoby: 4
// },
//         {
//     nr: 12,
//   lokal: 7,
//     ulica: 'ul. Sobieskiego',
//     osoby: 5
// },
//        {
//     nr: 42,
//   lokal: 7,
//     ulica: 'ul. tutu',
//     osoby: 7
// },
// ];

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


//Porównanie wyników
for (var i = 0; i < uniqueWgoStreets.length; i++) {
for (var k = 0; k <unique.length; k++) {
if (uniqueWgoStreets[i].nr == unique[k].nr && uniqueWgoStreets[i].ulica == unique[k].ulica && uniqueWgoStreets[i].osoby && unique[k].liczba_meldunków) {

uniqueWgoStreets[i].roznica = unique[k].liczba_meldunków - uniqueWgoStreets[i].osoby;
uniqueWgoStreets[i].meldunki = unique[k].liczba_meldunków;
}
}
}
return uniqueWgoStreets;
// console.log('Wynik WGO: ', uniqueWgoStreets);
}

module.exports = { compareData };