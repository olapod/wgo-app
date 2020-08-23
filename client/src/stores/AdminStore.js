import { observable, action, runInAction } from "mobx";
import { configure } from "mobx";
// import io from "socket.io-client";
configure({ enforceActions: 'observed' });
const axios = require('axios');

class AdminStore {
    constructor (appStore) {
        this.appStore = appStore;        
    }


    //database
    @observable elud = [];
    @observable wgo = [];


   @observable logs = [];
   @observable loadingDisabled = true;  
   @observable error = false;

  //get logs from node.js
  @action logReceive = (log) => {
    console.log('Logi: ', log)
        this.logs = [log, ...this.logs];
  }

  @action resetAdminPanel = () => {
        this.logs = [];
        this.elud = [];
        this.wgo = [];
        this.error = false;
  }


//ładowanie danych - AdminPage
loadEludData = data => {
  return new Promise(function(resolve, reject) {
    if (data[0].ulica && data[0].nr) {
      console.table(data);
        resolve(data);
    } else {
        reject("Nie jest ok");
    }
  })}

loadWgoData = data => {
  return new Promise(function(resolve, reject) {
    if (data[0].ulica && data[0].nr && data[0].osoby) {
        resolve(data);
    } else {
        reject("Nie jest ok");
    }
  })}

@action loadElud = async (data) => {
  this.loading = true;

        try {

            const response = await this.loadEludData(data)
            console.log('Spr: ', this.loading)
            if (response) {
                runInAction(() => {
                  this.elud = response;
                  this.loading = false;
                })
            }
        } catch (error) {
            runInAction(() => {
                this.error = true;
            });
        }
    };



@action
loadWgo = async (data) => {
  this.loading = true;
        try {

            const response = await this.loadWgoData(data)
            if (response) {
                runInAction(() => {
                  this.wgo = response
                    this.loading = false;
                })
            }
        } catch (error) {
            runInAction(() => {
                this.error = true;
            });
        }
    };


// @action loadWgoData = data => {
//   return this.wgo = data;
// };

@action errorHandle = () => {
  this.error = true;
}

@action postData = (e) => {
  e.preventDefault();

  axios.post('/api/updateData', {elud: this.elud, wgo: this.wgo})
    .then(runInAction(() => {this.loading = true}))
    .then(res => {runInAction(() => {
      this.loading = false;
      console.log('Status: ', res)})})
    // .then(console.log('Finish status: ', res.status))
    .catch(function (error) {
      console.log(error);
    });
  }
}


export default AdminStore;