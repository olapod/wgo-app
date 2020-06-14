import { observable, action } from "mobx";

class PaginationStore {
    constructor (appStore) {
        this.appStore = appStore;                      
    }

    // @observable message = 'Loading...';
   
    //pagination
    // @observable amount = 0;
    @observable sizePerPage = 10;
    @observable selectedPage = 0;
    
       
    //pagination function
    
    // @action handlePageClickedDiff = (data) => {
    //   let selected = data.selected;
    //   this.selectedPage = selected;
    //   this.appStore.homePageStore.getDiffItems(this.selectedPage);
    // };

    // @action handlePageClickedDiff = (page, sizePerPage, data) => {
    //   this.selectedPage = data.selected;
    //   page = this.selectedPage;
    //   sizePerPage =  this.itemsPerPage;
    //   this.appStore.homePageStore.getDiffItems(this.selectedPage);
    // };

    @action handleTableChange = (type, { page, sortField, sortOrder,  sizePerPage, filters }) => {
      this.selectedPage = page;
      this.sizePerPage = sizePerPage;
      console.log('Waht: ', this.itemsPerPage);
      this.appStore.homePageStore.getDiffItems(this.selectedPage, sortField, sortOrder, this.sizePerPage, filters);

    }
    
    @action handlePageClickedDGOStatus = (data) => {
      let selected = data.selected;
      this.selectedPage = selected;
      this.appStore.homePageStore.getDGOStatusItems(this.selectedPage);
      // console.log(selected)
    };
    
    
    }
    
    export default PaginationStore;