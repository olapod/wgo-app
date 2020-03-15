import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import DataUploadingWgo from '../features/DataUploadingWgo';
import DataUploadingElud from '../features/DataUploadingElud';
import Spinner from '../common/Spinner'

@inject('appStore')
@observer
class AdminPage extends Component {

  renderElud() {
    console.log('What: ', this.props.appStore.loading)

    if (!this.props.appStore.elud.length && !this.props.appStore.loading) {
      console.log('War 1')
      return (
        <div className='button_container'>
        <DataUploadingElud />
        </div>
      )}
    if (this.props.appStore.loading) {
      console.log('War 2', this.props.appStore.loading)
      return (
        <div >
        <p>Loading...</p>
        </div>
      )}
    if (!this.props.appStore.loading) {
      console.log('War 3')
        return (
          <div className='button_container'>
          <FontAwesomeIcon
								icon={faCheckCircle}/>
          <p>Plik z bazą ELUD wgrano poprawnie.</p>
          </div>
        )}
       }

  renderWgo() {
    if (this.props.appStore.loading) {
      return (
        <Spinner/>
      )}

    if (!this.props.appStore.wgo.length) {
      return (
        <div className='button_container'>
         <DataUploadingWgo />
         </div>
      )}
    if (this.props.appStore.wgo.length) {
        return (
          <div className='button_container'>
          <FontAwesomeIcon
								icon={faCheckCircle}/>
          <p>Plik WGO wgrano poprawnie.</p>
          </div>
        )}


  }

  render() {
    const isEnabled = this.props.appStore.wgo.length > 0 && this.props.appStore.elud.length > 0;
    const noButton = this.props.appStore.wgo.length > 0 && this.props.appStore.elud.length > 0 && !this.props.appStore.loading;
  return (
    <div className='data_loading'>
      <div className='csv_title'>
        <h3>Wgranie plików do porównania</h3>
        <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
      </div>

      <div className='container'>
        { this.renderWgo() }
        { this.renderElud() }
      </div>
      <div className='button_container'>
       <Button type="button" className="btn btn-primary" disabled={!isEnabled}
        onClick={this.props.appStore.postData}
        >
          Wgraj obie bazy
        </Button>
      {noButton ? <p>Bazy zostały załadowane</p> : <p>Czekam na załadowanie</p>}

      </div>
    </div>
    )
  }
}

  export default AdminPage;

