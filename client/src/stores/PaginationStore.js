import { observable, action } from "mobx";

class PaginationStore {
    constructor (appStore) {
        this.appStore = appStore;                      
    }

    // @observable message = 'Loading...';
   
    //pagination
    // @observable amount = 0;
    @observable itemsPerPage = 2;
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

    @action handleTableChange = (type, { page, sortField, sortOrder }) => {
      // let result = this.appStore.homePageStore.selectedUnitsByDiff.docs
      // // Handle column sort
      // if (sortOrder === 'asc') {
      //   result = result.sort((a, b) => {
      //     if (a[sortField] > b[sortField]) {
      //       return 1;
      //     } else if (b[sortField] > a[sortField]) {
      //       return -1;
      //     }
      //     return 0;
      //   });
      // } else {
      //   result = result.sort((a, b) => {
      //     if (a[sortField] > b[sortField]) {
      //       return -1;
      //     } else if (b[sortField] > a[sortField]) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      // }
      this.selectedPage = page;
      this.appStore.homePageStore.getDiffItems(this.selectedPage, sortField, sortOrder);

    }
    
    @action handlePageClickedDGOStatus = (data) => {
      let selected = data.selected;
      this.selectedPage = selected;
      this.appStore.homePageStore.getDGOStatusItems(this.selectedPage);
      // console.log(selected)
    };
    
    
    }
    
    export default PaginationStore;