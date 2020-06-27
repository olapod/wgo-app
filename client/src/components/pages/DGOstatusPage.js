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
      //  const pageCountbyDGOStatus = Math.ceil(selectedUnitsByDGOstatus.amount / selectedUnitsByDGOstatus.itemsPerPage);
      //  if(selectedUnitsByDGOstatus.docs) {
      //   return (
      //     <div className='diffContainer'>
      //       <h1 className='diffTitle'>Raport ze statusu: {selectedDGOstatus}</h1>
      //       <div className='diffTable'>
      //       <Table striped bordered >
      //       <thead>
      //         <tr>
      //           <th>ADRES</th>
      //           <th>LICZBA MELDUNKÓW</th>
      //           <th>LICZBA W DEKLARACJI</th>
      //           <th>RÓŻNICA</th>
      //           <th>STATUS DEKLARACJI</th>
      //         </tr>
      //         </thead>
      //       <tbody>
      //         {selectedUnitsByDGOstatus.docs.map(item => {
      //           return( 
      //           <tr key={item._id}>
      //             <td >{item.ulica} {item.nr}</td>
      //             <td>{item.meldunki}</td>
      //             <td>{item.osoby}</td> 
      //             <td>{item.roznica}</td> 
      //             <td>{item.DGO}</td>                
      //           </tr>
      //         )})}
      //   </tbody>
      // </Table>
      // </div>
      // <div className='paginationContainer'>
      // <Pagination
      // handlePageClick={handlePageClickedDGOStatus} pageCount={pageCountbyDGOStatus} itemsPerPage={selectedUnitsByDGOstatus.itemsPerPage}
      // />
      // </div>
      //     </div>
      //   );
      // }
      // else {return (<div>Loading...</div>)
      if(selectedUnitsByDGOstatus.docs) {
        return (
          <div className='diffContainer'>
             <h1 className='diffTitle'>Raport ze statusu: {selectedDGOstatus}</h1>
          <div className='diffTable'>
            
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
