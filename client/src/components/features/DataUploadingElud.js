import React from "react";
import CSVReader from 'react-csv-reader';
import { observer, inject } from 'mobx-react';
// import Button from 'react-bootstrap/Button';

@inject("appStore")
@observer
class DataUploadingElud extends React.Component {

  render() {
  return (
    <div className='csv'>
      <CSVReader
        onFileLoaded={this.props.appStore.loadElud.bind(this)}
        // inputStyle={{opacity: 0, width: '170px', marginLeft: '-170px'}}
        parserOptions={{header: true}}
        cssClass="csv-reader-input"
        cssInputClass='csv-input'
        onError={this.props.appStore.errorHandle.bind(this)}
        inputId="contained-button-file-2"
      />
      {/* <label className="custom-file-upload" htmlFor="contained-button-file-2">
        <Button type="button" className="btn btn-primary">
        Wgraj plik .CSV
        </Button>
      </label> */}
      <p>Wgraj plik .CSV z bazą danych. Plik powinien zawierać kolumnę o nazwię "ulica" oraz kolumnę o nazwie "numer". Ulice powinny mieć nazwy dokładnie takie same jak w bazie jednostek urbanistycznych! Wielkość liter nie ma znaczenia.</p>
    </div>
    )};
};

export default DataUploadingElud;