import { observable, action, runInAction, computed } from "mobx";
import { configure } from "mobx";
configure({ enforceActions: 'observed' });
const axios = require('axios');

class HomePageStore {
    constructor (appStore) {
        this.appStore = appStore;        
    }

    @observable summary = [];

     //database of filters filters
    @observable streets = [];
    @observable numbers = [];
    @observable diff = [];

    //selected items in filter
    @observable selectedStreet = '';
    @observable selectedNumber = null;
    @observable selectedDiff = null;
    @observable selectedDGOstatus = '';

   //filtred databse
   @observable selectedUnitByAddress = {};
    @observable selectedUnitsByDiff = [];
    @observable selectedUnitsByDGOstatus = [];

   

    @action resetSummary = () => {
      this.summary = []
    }

//pobieram całą bazę
@action getSummary = () => {
   //GET message from server using fetch api
   this.appStore.loading = true
   return axios.get('/api/getSummary')
   .then(res => {runInAction(() => {
   this.summary= res.data})})
  //  .then(json => this.summary = json)
}
//filtr wg ulicy i numeru

@action getStreets = () => {
   
  //GET message from server using fetch api
  return axios.get('/api/getStreets')
    .then(res => {runInAction(() => {
      this.streets = res.data
      this.resetNumber() 
      })})    
}

@computed get streetsOptions() {
  return this.streets.map(s => ({ label: s, value: s }))
}

@action streetsHandleChange = (selectedOption) => {
  this.selectedStreet = selectedOption.value;
  axios.get(`/api/streets/${this.selectedStreet}`)
.then(res => {runInAction(() => {
  this.numbers = res.data  
})})
}


@computed get numbersOptions() {
  return this.numbers.map(n => ({ label: n, value: n }))
}

@action resetNumber = () => {
  this.selectedNumber = null;
}

@action numbersHandleChange = (selectedOption) => {
  console.log('Store: ', selectedOption)
  this.selectedNumber = selectedOption.value;
  axios.get(`/api/streets/${this.selectedStreet}`)
.then(res => {runInAction(() => {
  this.numbers = res.data})})
        }

@action recordHandleClick = (e) => {
   e.preventDefault();
axios.get(`/api/streets/${this.selectedStreet}/${this.selectedNumber}`, {
        params: {
          street: this.selectedStreet,
          number: this.selectedNumber
        }
      })
.then(res => {runInAction(() => {
  this.selectedUnitByAddress = res.data})})
  }

//filtr różnic
@action getDiff = () => {
  //GET message from server using fetch api
  return axios.get('/api/getDiff')
    .then(res => {runInAction(() => {
      this.diff = res.data})})
}

@computed get diffOptions() {
  return this.diff.map(d => ({ label: d, value: d}))
}

@action diffHandleChange = (selectedOption) => {
  this.selectedDiff = selectedOption.value;
        }

// @action diffHandleClick = (e) => {
//    e.preventDefault();

//   }

@action getDiffItems = (page) => {
   const itemsPerPage = 20;
  //  const startAt = (page - 1) * itemsPerPage;
   const startAt = page * itemsPerPage;
   const limit = itemsPerPage;
axios.get(`/api/differences/${this.selectedDiff}/range/${startAt}/${limit}`, {
        params: {
          diff: this.selectedDiff,
          startAt: startAt,
          limit: limit
        }
      })
.then(res => {runInAction(() => {
  this.selectedUnitsByDiff = {
        docs: res.data.docs,
        amount: res.data.amount,
        itemsPerPage,
        selectedPage: page,
      }})})
.then(runInAction(() => {this.appStore.loading = false}))
  }

//filtr statusu deklaracji
@action DGOhandleChange = (selectedOption) => {
  this.selectedDGOstatus = selectedOption.value;
        }

@action getDGOStatusItems = (page) => {
   const itemsPerPage = 20;
  //  const startAt = (page - 1) * itemsPerPage;
   const startAt = page * itemsPerPage;
   const limit = itemsPerPage;
axios.get(`/api/DGOstatus/${this.selectedDGOstatus}}/range/${startAt}/${limit}`, {
        params: {
          status: this.selectedDGOstatus,
          startAt: startAt,
          limit: limit
        }
      })
.then(res => {runInAction(() => {
  this.selectedUnitsByDGOstatus = {
        docs: res.data.docs,
        amount: res.data.amount,
        itemsPerPage,
        selectedPage: page,
      }})})
.then(runInAction(() => {this.appStore.loading = false}))

  }
}


export default HomePageStore;