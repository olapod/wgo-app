import { observable, action } from "mobx";

class PaginationStore {
    constructor (appStore) {
        this.appStore = appStore;                
    }

    // @observable message = 'Loading...';
   
    //pagination
    // @observable amount = 0;
    // @observable itemsPerPage = 2;
    @observable selectedPage = 0;
    
       
    //pagination function
    
    @action handlePageClickedDiff = (data) => {
      let selected = data.selected;
      this.selectedPage = selected;
      this.appStore.homePageStore.getDiffItems(this.selectedPage);
    };
    
    @action handlePageClickedDGOStatus = (data) => {
      let selected = data.selected;
      this.selectedPage = selected;
      this.appStore.homePageStore.getDGOStatusItems(this.selectedPage);
      // console.log(selected)
    };
    
    }
    
    export default PaginationStore;