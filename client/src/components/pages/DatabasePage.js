import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import Pagination from '../common/Pagination';
import Table from '../features/Table';
import Container from 'react-bootstrap/Container';
// import Table from 'react-bootstrap/Table';
import Spinner from '../common/Spinner';
import Button from 'react-bootstrap/Button';
import { CSVLink } from "react-csv";
import './DifferencePage.scss';

@inject('appStore', 'homePageStore', 'paginationStore')
@observer

export default class DatabasePage extends Component {
componentDidMount(){
    this.props.homePageStore.getSummary();
    }

    componentWillUnmount() {
      
      this.props.appStore.resetLoading();
      this.props.homePageStore.resetAllRecords(); 
    }

    render() {
      //  let { handlePageClickedDGOStatus} = this.props.paginationStore;
       let { summaryHandleTableChange} = this.props.paginationStore;
       
       let {summary, getAllRecords, allRecords} = this.props.homePageStore;
  
      let {loading} = this.props.appStore;

      let downloadLink;
    // console.log('What: ', selectedDGOstatus, 'Co: ', statusDisabled)
    console.log('Loading: ', loading, 'Summary: ', allRecords)
      
    if (allRecords.length === 0 && loading === true) {
      downloadLink = <Spinner />
    } if (allRecords.length > 0 && loading === true) {
      downloadLink  = <CSVLink data={allRecords}>Baza gotowa do pobrania</CSVLink>
    }
    if (allRecords.length === 0 && loading === false) {
      downloadLink  = <Button className='csvButton' onClick={getAllRecords}> Pobierz bazę</Button>
    }
    
      if(summary.docs) {
        return (
            <div className='diffContainer'>
             <h1 className='diffTitle'>Kompletna baza danych</h1>
          <Container className='diffTable'>
            
            <Table
              data={ summary.docs }
              // page={ selectedPage }
              // sizePerPage={ selectedUnitsByDiff.itemsPerPage }
              totalSize={summary.amount}
              onTableChange={ summaryHandleTableChange  }
            />   
           
      </Container>
      <Container className='text-center mt-5'>
        <div className='csvTitle'><p>Pobierz całą bazę w formacie CSV</p></div>
        <div className='downloadLink'>
          {downloadLink}
        </div>
        
      </Container>
          </div>
        );
      }
      else {return (<div>Loading...</div>)}
  }
}
