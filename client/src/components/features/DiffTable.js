import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './DiffTable.scss';
// import cellEditFactory from 'react-bootstrap-table2-editor';
// import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';

const columns = [{
    dataField: '_id',
    text: 'ID',
    hidden: true
  },
     {
    dataField: 'ulica',
    text: 'ADRES',
    sort: true,
    // sortCaret: (order, column) => {
    //   if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
    //   else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
    //   else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
    //   return null;
    // }
  },
  {
    dataField: 'nr',
    text: 'NUMER',
    sort: true
  }, {
    dataField: 'meldunki',
    text: 'LICZBA MELDUNKÓW',
    sort: true
  }, {
    dataField: 'osoby',
    text: 'LICZBA W DEKLARACJI',
    sort: true
  }, {
    dataField: 'roznica',
    text: 'RÓŻNICA',    
  }, {
    dataField: 'DGO',
    text: 'STATUS DEKLARACJI',
    sort: true
  }];

  const defaultSorted = [{
    dataField: 'nr',
    order: 'desc'
  }];
  
  // const cellEditProps = {
  //   mode: 'click'
  // };

  const DiffTable = ({ data, page, sizePerPage, totalSize, onTableChange }) => (
    <div>
      <BootstrapTable
        striped
        hover
        remote
        bootstrap4
        keyField="_id"
        data={ data }
        columns={ columns }
        defaultSorted={ defaultSorted }
        // filter={ filterFactory() }
        pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
        onTableChange={ onTableChange }
        // cellEdit={ cellEditFactory(cellEditProps) }        
     />    
    </div>
  );
  export default DiffTable;