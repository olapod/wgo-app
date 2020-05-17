import { observable, action } from "mobx";
import AdminStore from './AdminStore';
import HomePageStore from './HomePageStore';
import PaginationStore from './PaginationStore';


class AppStore {

  constructor() {
    this.adminStore = new AdminStore(this);
    this.homePageStore = new HomePageStore(this);
    this.paginationStore = new PaginationStore(this);
  }

  @observable message = 'Loading...';
   
    //other
    @observable loading = false;
    @observable redirect = false;
    @observable error = false;     
    
  //login & logout
  @observable login = false;
  @observable redirect = false;
  @observable email = '';
  
  @action logIn = () => {
    this.login = true;
    this.redirect = false;
  }

  @action logOut = () => {
   
    this.login = false;
    this.email = '';
    
      fetch('/api/logout', {
        method: 'get',
        credentials: 'include',
        redirect: "follow"
      }).then(res => {
        if (res.status === 200) {
          this.getEmail('');
          this.adminStore.logs = [];
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Błąd wylogowania. Spróbuj ponownie!');
      });         
  }
  

  @action reDirect = () => {
    this.redirect = true
  }

    @action resetLoading = () => {
      this.loading = false
    }

    //login Page
    @action getEmail = (adress) => {
      this.email = adress
    }
    
    // @action resetSummary = () => {
    //   this.summary = []
    // }

    @action errorHandle = () => {
      this.error = true;
    }

}



const appStore = new AppStore();

export default appStore;