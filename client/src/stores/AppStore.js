import { observable, action } from "mobx"

class AppStore {
    // constructor () {
    //     this.resetState();

    // }

    @observable email = '';
    @observable password = '';
    @observable message = 'Loading...';
    @observable summary = [];
    @observable elud = [];
    @observable wgo = [];
    @observable loading = true;
    @observable redirect = false;
    @observable error = false;

  //GET message from server using fetch api
  @action getMessage = () => {
    fetch('/api/admin')
    .then(res => res.text())
    .then(res =>
      // this.appStore.message = res
      this.message = res);
    }

@action getSummary = () => {
   //GET message from server using fetch api
   fetch('/api/getData')
   .then(res => res.json())
   .then(json => this.summary = json);

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
}
const appStore = new AppStore();

export default appStore;