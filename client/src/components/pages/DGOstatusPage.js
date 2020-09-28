import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import Pagination from '../common/Pagination';
import Table from '../features/Table';
// import Table from 'react-bootstrap/Table';
import './DifferencePage.scss';

@inject('appStore', 'homePageStore', 'paginationStore')
@observer

export default class DGOstatusPage extends Component {
componentDidMount(){
    this.props.homePageStore.getDGOStatusItems(this.props.appStore.selectedPage);
    }

    componentWillUnmount() {
      this.props.homePageStore.resetStatusButton();
    }

    render() {
      //  let { handlePageClickedDGOStatus} = this.props.paginationStore;
       let { DGOStatusHandleTableChange } = this.props.paginationStore;
       let { selectedUnitsByDGOstatus, selectedDGOstatus } = this.props.homePageStore;
      
      if(selectedUnitsByDGOstatus.docs) {
        return (
          <div className='dataContainer'>
             <h1 className='dataTitle'>Raport ze statusu: {selectedDGOstatus}</h1>
          <div className='dataTable statusTable'>
            
            <Table
              data={ selectedUnitsByDGOstatus.docs }
              // page={ selectedPage }
              // sizePerPage={ selectedUnitsByDiff.itemsPerPage }
              totalSize={selectedUnitsByDGOstatus.amount}
              onTableChange={ DGOStatusHandleTableChange  }
            />   
           
      </div>
          </div>
        );
      }
      else {return (<div>Loading...</div>)}
  }
}
