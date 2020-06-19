import { observable, action, runInAction, computed } from "mobx";
import { configure } from "mobx";
configure({ enforceActions: 'observed' });
const axios = require('axios');

class HomePageStore {
    constructor (appStore) {
        this.appStore = appStore;        
    }

    @observable summary = [];
    @observable itemsPerPage = 10;
    @observable startAt = null;
    @observable limit = null;

     //database of filters filters
    @observable streets = [];
    @observable numbers = [];
    @observable diff = [];

    //selected items in filter
    @observable selectedStreet = '';
    @observable selectedNumber = null;
    @observable selectedDiff = null;
    @observable selectedDGOstatus = null;

    //button's control
    @observable diffDisabled = true;
    @observable recordDisabled = true;
    @observable statusDisabled = true;

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
  this.recordDisabled = false;
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
  console.log('Test: ', res.data)
  this.selectedUnitByAddress = res.data})})
  }

  @action resetRecordButton() {
    this.selectedNumber = null;
    this.recordDisabled = true;
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

@action resetDiffButton() {
  this.selectedDiff = null;
  this.diffDisabled = true;
}

@action diffHandleChange = (selectedOption) => {
  this.selectedDiff = selectedOption.value;
  this.diffDisabled = false;
}

// @action diffHandleClick = (e) => {
//    e.preventDefault();

//   }

@action getDiffItems = (page, sortField, sortOrder, sizePerPage, filters) => {
  console.log('Filters: ', filters)
  let filter = {};
   let order = 1;
  if(sizePerPage) {this.itemsPerPage = sizePerPage}
   this.startAt = (page - 1) * this.itemsPerPage;
   this.limit = this.itemsPerPage;
    if (sortOrder === 'desc') { order = -1 }
    else {order = 1}
   
   
    // if (filters === undefined || Object.keys(filters).length === 0) {filter = {diff: this.selectedDiff}}
    if (filters) {
      let values = Object.keys(filters).map(f =>filters[f].filterVal);
      let keys = Object.keys(filters);
      console.log('One: ', keys, ' Two: ', values)
      keys.forEach((key, i) => filter[key] = values[i]);
      Object.assign(filter, {roznica: this.selectedDiff})
      // console.log('Filter: ', filter)
      }
    else {filter = {roznica: this.selectedDiff}}
    console.log('Filter: ', filter)
  
    
axios.get(`/api/differences/${this.selectedDiff}/range/${this.startAt}/${this.limit}`, {
        params: {
          // diff: this.selectedDiff,
          startAt: this.startAt,
          limit: this.limit,
          sort: {[sortField]: order},
          filters: filter
        }
      })
.then(res => {runInAction(() => {
  this.selectedUnitsByDiff = {
        docs: res.data.docs,
        amount: res.data.amount,
        // itemsPerPage,
        // selectedPage: page,
      }})})
// .then(console.log('Test: ', this.selectedUnitsByDiff.docs))
.then(runInAction(() => {this.appStore.loading = false}))
    
  }

//filtr statusu deklaracji
@action DGOhandleChange = (selectedOption) => {
  this.selectedDGOstatus = selectedOption.value;
  this.statusDisabled = false;
        }

@action getDGOStatusItems = (page, sortField, sortOrder, sizePerPage, filters) => {

console.log('Filters: ', filters)
  let filter = {};
   let order = 1;
  if(sizePerPage) {this.itemsPerPage = sizePerPage}
   const startAt = (page - 1) * this.itemsPerPage;
     const limit = this.itemsPerPage;
    if (sortOrder === 'desc') { order = -1 }
    else {order = 1}
   
   
    // if (filters === undefined || Object.keys(filters).length === 0) {filter = {diff: this.selectedDiff}}
    if (filters) {
      let values = Object.keys(filters).map(f =>filters[f].filterVal);
      let keys = Object.keys(filters);
     
      keys.forEach((key, i) => filter[key] = values[i]);
      Object.assign(filter, {DGO: this.selectedDGOstatus})
      // console.log('Filter: ', filter)
      }
    else {filter = {DGO: this.selectedDGOstatus}}
    console.log('Filter: ', filter)
  
    
axios.get(`/api/DGOstatus/${this.selectedDGOstatus}}/range/${startAt}/${limit}`, {
        params: {
          startAt: startAt,
          limit: limit,
          sort: {[sortField]: order},
          filters: filter
        }
      })
.then(res => {runInAction(() => {
  this.selectedUnitsByDGOstatus = {
        docs: res.data.docs,
        amount: res.data.amount,
        // itemsPerPage,
        // selectedPage: page,
      }})})
// .then(console.log('Test: ', this.selectedUnitsByDiff.docs))
.then(runInAction(() => {this.appStore.loading = false}))
  }

  @action resetStatusButton() {
    this.selectedDGOstatus = null;
    this.statusDisabled = true;
  } 
  
}



export default HomePageStore;