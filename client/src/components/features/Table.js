import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.scss';
// import cellEditFactory from 'react-bootstrap-table2-editor';
// import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';


const selectOptions = {
  'złożona deklaracja odpadowa': 'złożona deklaracja odpadowa',
  'niezłożona deklaracja odpadowa': 'niezłożona deklaracja odpadowa'  
};
const columns = [{
    dataField: '_id',
    text: 'ID',
    hidden: true
  },
     {
    dataField: 'ulica',
    text: 'ADRES',
    sort: true,
    filter: textFilter({placeholder: 'wprowadź ulicę'}),
    headerStyle: {width: '230px'}
  }, {
    dataField: 'nr',
    text: 'NUMER',
    sort: true,
    filter: textFilter({placeholder: 'wprowadź nr'})
  }, {
    dataField: 'meldunki',
    text: 'LICZBA MELDUNKÓW',
    sort: true,
    filter: textFilter({placeholder: 'wprowadź liczbę'})
  }, {
    dataField: 'osoby',
    text: 'LICZBA W DEKLARACJI',
    sort: true,
    filter: textFilter({placeholder: 'wprowadź liczbę'})
  }, {
    dataField: 'roznica',
    text: 'RÓŻNICA',
    sort: true,
    filter: textFilter({placeholder: 'wprowadź liczbę'})    
  }, {
    dataField: 'DGO',
    text: 'STATUS DEKLARACJI',
    sort: true,
    filter: selectFilter({options: selectOptions, placeholder: 'wprowadź status deklaracji'}),
    headerStyle: {width: '260px'}
  }];

  const defaultSorted = [{
    dataField: 'ulica',
    order: 'asc'
  }];
  
  
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
       Pokazuję { from } do { to } z { size } wyników
    </span>
  );

   const Table = ({ data, page, sizePerPage, totalSize, onTableChange }) => (
    <div>
       
      <BootstrapTable
        striped
        hover
        // responsive 
        remote
        bootstrap4
        keyField="_id"
        data={ data }
        columns={ columns }
        defaultSorted={ defaultSorted }
        filter={ filterFactory() }
        pagination={ paginationFactory({ 
          sizePerPage, 
          totalSize, 
          page, 
          showTotal: true,  
          nextPageText: 'Następna', 
          lastPageText: 'Ostatnia', 
          firstPageText: 'Pierwsza',
          nextPageTitle: 'Kolejna', 
          prePageTitle: 'Poprzednia',
          firstPageTitle: 'Pierwsza', 
          lastPageTitle: 'Ostatnia',
          paginationTotalRenderer: customTotal,
          hidePageListOnlyOnePage: true
        })}
        
          onTableChange={ onTableChange }
          noDataIndication="Tabela nie zawiera danych"
        // cellEdit={ cellEditFactory(cellEditProps) }        
      
     />    
    </div>
  );
  export default Table;