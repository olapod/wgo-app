import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataUploadingWgo from '../features/DataUploadingWgo';
import DataUploadingElud from '../features/DataUploadingElud';
import Error from '../common/Error';
import io from 'socket.io-client';
import './AdminPage.scss';
const socket = io("localhost:3001")

@inject('appStore', 'adminStore') 
@observer
class AdminPage extends Component {

componentDidMount() {
  socket.removeAllListeners();
  socket.on('log', log => this.props.adminStore.logReceive(log));
}

 componentWillUnmount() {
  //  socket.emit('end');
   this.props.adminStore.resetAdminPanel();
  }

  renderElud() {
    console.log('What: ', this.props.appStore.loading)
    if (this.props.adminStore.error) {
      return (
        <div>Dupa</div>
      )
    }

    if (!this.props.adminStore.elud.length && !this.props.appStore.loading) {
      // console.log('War 1')
      return (
        <div className='button_container'>
        <DataUploadingElud />
        </div>
      )}
    if (this.props.appStore.loading) {
      // console.log('War 2', this.props.appStore.loading)
      return (
        <div >
        <p>Loading...</p>
        </div>
      )}
    if (!this.props.appStore.loading) {
      // console.log('War 3')
        return (
          <div className='button_container'>
          <FontAwesomeIcon
								icon={faCheckCircle}/>
          <p>Plik z bazą ELUD wgrano poprawnie.</p>
          </div>
        )}

       
       }

  renderWgo() {
    // if (this.props.appStore.loading) {
    //   //  this.props.appStore.getLogs();
    //   return (
    //     <Spinner/>
    //   )}
    if (this.props.adminStore.error) {
      return (
        <Error/>
      )          
    }

    if (!this.props.adminStore.wgo.length) {
      return (
        <div className='button_container'>
         <DataUploadingWgo />
         </div>
      )}
    if (this.props.adminStore.wgo.length) {
        return (
          <div className='button_container'>
          <FontAwesomeIcon
								icon={faCheckCircle}/>
          <p>Plik WGO wgrano poprawnie.</p>
          </div>
        )}
        


  }

  render() {
    console.log('Error: ', this.props.adminStore.error)
    const isEnabled = this.props.adminStore.wgo.length > 0 && this.props.adminStore.elud.length > 0 && !this.props.adminStore.logs[0];
    const noButton = this.props.adminStore.wgo.length > 0 && this.props.adminStore.elud.length > 0 && !this.props.appStore.loading;
    // console.log('Test: ', this.props.adminStore.wgo.length, this.props.adminStore.elud.length, this.props.appStore.loading, this.props.adminStore.logs)
  return (
    <div className='dataLoadingContainer'>
      <div className='csvTitle'>
        <h1>Wgranie plików do porównania</h1>        
      </div>
      <div className='fileUploadContainer'>
      <p className='utfStatement'>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
      <Container >
        <Row>
          <Col>
          { this.renderWgo() }
          </Col>
        <Col>
        { this.renderElud() }
        </Col>
        
        </Row>
      </Container>
      <div className='button_container'>
      {noButton ? <p>Bazy zostały załadowane.</p> : <p>Czekam na załadowanie plików.</p>}
       <Button 
       className={!isEnabled ? 'buttonInactive' : 'buttonActive'}
      
        onClick={this.props.adminStore.postData}
        >
          Porównaj obie bazy
        </Button>
      

      </div>
      
      
      <div className='logsContainer'>
      <h5>Logi</h5>
      <div className='logs'>
      <ul >
			{ this.props.adminStore.logs.map((log, i) => <li key={i}>{log}</li>)}
		</ul>
    </div>
    </div>
      </div>
    </div>
    )
  }
}

  export default AdminPage;

