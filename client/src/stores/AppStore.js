import { observable, action } from "mobx"

class AppStore {
    // constructor () {
    //     this.resetState();

    // }

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

@action postData = (e) => {
  e.preventDefault();
  const obj = {elud: this.elud, wgo: this.wgo};

  fetch('/api/data', {
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