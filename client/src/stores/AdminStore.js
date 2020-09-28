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
   @observable dataLoading = false;

  //get logs from node.js
  @action logReceive = (log) => {
    // console.log('Logi: ', log)
        this.logs = [log, ...this.logs];
  }

  @action resetAdminPanel = () => {
        this.logs = [];
        this.elud = [];
        this.wgo = [];
        this.error = false;
        this.dataLoading = false;
  }


//ładowanie danych - AdminPage
loadEludData = data => {
  return new Promise(function(resolve, reject) {
    if (data[0].ulica && data[0].nr && data[0].ul_cecha) {
      // console.table(data);
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
  // this.dataLoading = true;

        try {

            const response = await this.loadEludData(data)
            // console.log('Spr: ', this.dataLoading)
            if (response) {
                runInAction(() => {
                  this.elud = response;
                  // this.dataLoading = false;
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
  // this.dataLoading = true;
        try {

            const response = await this.loadWgoData(data)
            if (response) {
                runInAction(() => {
                  this.wgo = response
                    // this.dataLoading = false;
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

@action
postData = async (e ) => {
  // this.dataLoading = true;
        try {
          runInAction(() => {this.dataLoading = true;});
            const response = await axios.post('/api/updateData', {elud: this.elud, wgo: this.wgo})
            if (response) {
              console.log('Status: ', response)
                runInAction(() => {                
                this.dataLoading = false;
                })
            }
        } catch (error) {
            runInAction(() => {
                this.error = true;
            });
        }
    };


}

export default AdminStore