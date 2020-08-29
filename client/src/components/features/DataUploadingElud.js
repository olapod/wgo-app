import React from "react";
import CSVReader from 'react-csv-reader';
import { observer, inject } from 'mobx-react';
import Button from 'react-bootstrap/Button';
import './DataUploadingElud.scss';

@inject('appStore', 'adminStore')
@observer
class DataUploadingElud extends React.Component {

  render() {
  return (
    <div className='csv'>
      
      <label className="custom-file-upload" htmlFor="contained-button-file-2">
      <CSVReader
        onFileLoaded={this.props.adminStore.loadElud.bind(this)}
        inputStyle={{
          opacity: 0, 
        width: '120px', 
        marginLeft: '-60px',
        marginTop: '13px', 
        position: 'absolute', 
        border: '3px solid #23AD21'
      }}
        parserOptions={{header: true}}
        cssClass="csv-reader-input"
        cssInputClass='csv-input'
        onError={this.props.appStore.errorHandle.bind(this)}
        inputId="contained-button-file-2"
      />
      
      <span className='spanButton'>
        Wgraj plik .CSV
        </span>
      </label>      
      <p>Wgraj plik ELUD z bazą danych. </p>
    </div>
    )};
};

export default DataUploadingElud;