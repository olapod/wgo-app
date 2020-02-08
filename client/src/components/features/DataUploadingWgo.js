import React from "react";
import CSVReader from 'react-csv-reader';
import { observer, inject } from 'mobx-react';
// import appStore from '../stores/appStore';

// import Button from 'react-bootstrap/Button';

@inject("appStore")
@observer
class DataUploadingWgo extends React.Component {
  render() {
    return (
      <div className='csv'>
        <CSVReader
          onFileLoaded={this.props.appStore.loadWgo.bind(this)}
          // inputStyle={{ opacity: 0, width: '170px', marginLeft: '-170px' }}
          parserOptions={{header: true}}
          cssClass="csv-reader-input"
          cssInputClass='csv-input'
          inputId='contained-button-file'
          onError={this.props.appStore.errorHandle.bind(this)}
        />
        {/* <label className="custom-file-upload" htmlFor="contained-button-file">
          <Button type="button" className="btn btn-primary">
          Wgraj plik .CSV
          </Button>
        </label> */}
        <p>Wgraj plik .CSV z bazą WGO. </p>
      </div>
    )};
};

export default DataUploadingWgo;