import { observable, action, computed } from "mobx";
const axios = require('axios');

class AppStore {

    @observable message = 'Loading...';
    @observable summary = [];

     //database of filters filters
    @observable streets = [];
    @observable numbers = [];
    @observable diff = [];

    //selected items in filter
    @observable selectedStreet = '';
    @observable selectedNumber = '';
    @observable selectedDiff = null;
    @observable selectedDGOstatus = '';

   //filtred databse
   @observable selectedUnitByAddress = {};
    @observable selectedUnitsByDiff = [];
    @observable selectedUnitsByDGOstatus = [];

    //database
    @observable elud = [];
    @observable wgo = [];

    //other
    @observable loading = true;
    @observable redirect = false;
    @observable error = false;




  //GET message from server using fetch api
  @action getMessage = () => {
    return axios.get('/api/admin')
    .then(res =>
      // this.appStore.message = res
      this.message = res.data);
    }
//pobieram całą bazę
@action getSummary = () => {
   //GET message from server using fetch api
   return axios.get('/api/getSummary')
   .then(res => this.summary= res.data)
  //  .then(json => this.summary = json)
}
//filtr wg ulicy i numeru

@action getStreets = () => {
  //GET message from server using fetch api
  return axios.get('/api/getStreets')
    .then(res => this.streets = res.data)
}

@computed get streetsOptions() {
  return this.streets.map(s => ({ label: s, value: s }))
}

@action streetsHandleChange = (selectedOption) => {
  // this.selectedStreet = selectedOption.value;
  this.selectedStreet = selectedOption.value;
  axios.get(`/api/streets/${this.selectedStreet}`)
.then(res => this.numbers = res.data)
        }

@computed get numbersOptions() {
  return this.numbers.map(n => ({ label: n, value: n }))
}

@action numbersHandleChange = (selectedOption) => {
  this.selectedNumber = selectedOption.value;
  axios.get(`/api/streets/${this.selectedStreet}`)
.then(res => this.numbers = res.data)
        }

@action recordHandleClick = (e) => {
   e.preventDefault();
axios.get(`/api/streets/${this.selectedStreet}/${this.selectedNumber}`)
.then(res => this.selectedUnitByAddress = res.data)
  }

//filtr różnic
@action getDiff = () => {
  //GET message from server using fetch api
  return axios.get('/api/getDiff')
    .then(res => this.diff = res.data)
}

@computed get diffOptions() {
  return this.diff.map(d => ({ label: d, value: d}))
}

@action diffHandleChange = (selectedOption) => {
  this.selectedDiff = selectedOption.value;
        }

@action diffHandleClick = (e) => {
   e.preventDefault();
axios.get(`/api/differences/${this.selectedDiff}`)
.then(res => this.selectedUnitsByDiff = res.data)
.then(this.loading = false);
  }

//filtr statusu deklaracji
@action DGOhandleChange = (selectedOption) => {
  this.selectedDGOstatus = selectedOption.value;
        }

@action DGOhandleClick = (e) => {
   e.preventDefault();
axios.get(`/api/DGOstatus/${this.selectedDGOstatus}`)
.then(res => this.selectedUnitsByDGOstatus = res.data)
.then(res => console.log('dff: ',this.selectedUnitsByDGOstatus))
.then(this.loading = false);
  }

//ładowanie danych - AdminPage

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

  axios.post('/api/updateData', {elud: this.elud, wgo: this.wgo})
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}



const appStore = new AppStore();

export default appStore;