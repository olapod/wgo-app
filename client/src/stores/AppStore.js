import { observable, action, computed } from "mobx";
const axios = require('axios');

class AppStore {

    @observable message = 'Loading...';
    @observable summary = [];
    @observable streets = [];
    @observable numbers = [];
    @observable elud = [];
    @observable wgo = [];
    @observable loading = true;
    @observable redirect = false;
    @observable error = false;
    @observable selectedStreet = '';
    @observable selectedNumber = '';

  //GET message from server using fetch api
  @action getMessage = () => {
    return axios.get('/api/admin')
    .then(res =>
      // this.appStore.message = res
      this.message = res.data);
    }

@action getSummary = () => {
   //GET message from server using fetch api
   return axios.get('/api/getSummary')
   .then(res => this.summary= res.data)
  //  .then(json => this.summary = json)
}

@action streetsHandleChange = (selectedOption) => {
  // this.selectedStreet = selectedOption.value;
  this.selectedNumber = ''
  this.selectedStreet = selectedOption.value;
  axios.get(`/api/streets/${this.selectedStreet}`)
.then(res => this.numbers = res.data)
        }

@action numbersHandleChange = (selectedOption) => {
  this.selectedNumber = selectedOption.value;
  console.log('uuu: ', this.selectedNumber)
  axios.get(`/api/streets/${this.selectedStreet}`)
.then(res => this.numbers = res.data)
        }

@action getStreets = () => {
  //GET message from server using fetch api
  return axios.get('/api/getStreets')
    .then(res => this.streets = res.data)
}

@computed get streetsOptions() {
  return this.streets.map(s => ({ label: s, value: s }))
}

@computed get numbersOptions() {
  return this.numbers.map(n => ({ label: n, value: n }))
}

@action handleClick = (e) => {
   e.preventDefault();
axios.get(`/api/streets/${this.selectedStreet}/${this.selectedNumber}`)
.then(res => console.log("Dostaje2: ", res))
  }

@action loadWgo = data => {
  this.wgo = data;
};

@action loadElud = data => {
  this.elud = data;
};

@action errorHandle = () => {
  this.error = true;
}

@action postData = (e) => {
  e.preventDefault();
  const obj = {elud: this.elud, wgo: this.wgo};

  fetch('/api/updateData', {
    method: "post",
    headers: {
        "Content-Type": "application/json" //lub używając powyższej opisanego Headers()
    },
    body: JSON.stringify(obj)
})
.then(res => res.json())
.then((res) => {
    console.log("Dodałem bazy danych", res);
})
.catch(error => console.log("Błąd!!: ", error))
 }
}



const appStore = new AppStore();

export default appStore;