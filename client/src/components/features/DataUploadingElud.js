import React from "react";
import CSVReader from 'react-csv-reader';
import { observer, inject } from 'mobx-react';

@inject('appStore', 'adminStore')
@observer
class DataUploadingElud extends React.Component {

  render() {
  return (
    <div className='csv'>
      <label className="custom-file-upload" htmlFor="contained-button-file-2">
        <CSVReader
          onFileLoaded={this.props.adminStore.loadElud.bind(this)}
          inputStyle={{display: 'none'}}
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