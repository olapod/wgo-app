import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DiffTable from '../features/DiffTable';
// import Pagination from '../common/Pagination';
// import Table from 'react-bootstrap/Table';
import './DifferencePage.scss';

@inject('appStore', 'homePageStore', 'paginationStore')
@observer

export default class DifferencePage extends Component {

  componentDidMount(){
    this.props.homePageStore.getDiffItems(this.props.appStore.selectedPage);
    }
  
  componentWillUnmount() {
    this.props.homePageStore.resetDiffButton();
  }

    render() {
       let {selectedUnitsByDiff, selectedDiff } = this.props.homePageStore; 
        let { handleTableChange, selectedPage } = this.props.paginationStore;
       const pageCountbyDiff = Math.ceil(selectedUnitsByDiff.amount / selectedUnitsByDiff.itemsPerPage);
       console.log('Paginacja: ', selectedUnitsByDiff.docs, selectedPage, pageCountbyDiff)
       
       if(selectedUnitsByDiff.docs) {
      return (
        <div className='diffContainer'>
          <h1 className='diffTitle'>Raport z punktów adresowych o różnicy {selectedDiff}</h1>
          <div className='diffTable'>
          
          <DiffTable
            data={ selectedUnitsByDiff.docs }
            page={ selectedPage }
            sizePerPage={ selectedUnitsByDiff.itemsPerPage }
            totalSize={selectedUnitsByDiff.amount}
            onTableChange={ handleTableChange }
          />
         
          {/* <Table striped bordered >
          <thead>
            <tr>
              <th>ADRES</th>
              <th>LICZBA MELDUNKÓW</th>
              <th>LICZBA W DEKLARACJI</th>
              <th>RÓŻNICA</th>
              <th>STATUS DEKLARACJI</th>
            </tr>
            </thead>
          <tbody>
            {selectedUnitsByDiff.docs.map(item => {
              return( 
              <tr key={item._id}>
                <td >{item.ulica} {item.nr}</td>
                <td>{item.meldunki}</td>
                <td>{item.osoby}</td> 
                <td>{item.roznica}</td> 
                <td>{item.DGO}</td>                
              </tr>
            )})}
      </tbody>
		</Table>
    </div>
    <div className='paginationContainer'>
    <Pagination
    handlePageClick={handlePageClickedDiff} pageCount={pageCountbyDiff} itemsPerPage={selectedUnitsByDiff.itemsPerPage}
    /> */}
    </div>
        </div>
      );
    }
    else {return (<div>Loading...</div>)}
  }
}