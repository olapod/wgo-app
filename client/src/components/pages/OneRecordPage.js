import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './OneRecordPage.scss';
@inject('appStore', 'homePageStore')
@observer

export default class OneRecordPage extends Component {
  
  componentWillUnmount() {
    this.props.homePageStore.resetRecordButton();
  }

    render() {      
      let {selectedUnitByAddress} = this.props.homePageStore;
      let text;
      console.log('record: ', selectedUnitByAddress)
       if (selectedUnitByAddress.roznica === 0) {
      text = <div><p>Liczba osób zameldowanych jest taka sama jak zgłoszonych do deklaracji odpadowej</p><span className='okRecord'><FontAwesomeIcon
      icon={faCheckCircle}/></span></div>;
    } if (selectedUnitByAddress.roznica > 0) {
      text = <div><p>Liczba osób zameldowanych jest wyższa od zgłoszonych do deklaracji odpadowej o {selectedUnitByAddress.roznica}</p><span className='badRecord'><FontAwesomeIcon
      icon={faExclamationCircle}/></span></div>;
    } if (selectedUnitByAddress.roznica < 0) {
      text = <div><p>Liczba osób zameldowanych jest niższa od zgłoszonych do deklaracji odpadowej o {selectedUnitByAddress.roznica * -1}.</p><span className='okRecord'><FontAwesomeIcon icon={faCheckCircle}/></span></div>;
      }
      return (
        <div className='recordContainer'>
          <h1 className='recordTitle title'>Raport dla punktu adresowego</h1>
          <div className='recordTable'>
          <Table striped bordered >
            <thead>
            <tr>
              <th>ADRES</th>
              <th>{selectedUnitByAddress.ulica} NR {selectedUnitByAddress.nr}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Liczba osób zameldowanych</td>
              <td>{selectedUnitByAddress.meldunki}</td>
            </tr>
            <tr>
              <td>Liczba osób w deklaracji odpadowej</td>
              <td>{selectedUnitByAddress.osoby}</td>
            </tr>
            <tr>
              <td>Status deklaracji</td>
              <td>{selectedUnitByAddress.DGO}</td>
            </tr>
            </tbody>
          </Table>
          </div>
            <h3 className='recordText'>{text}</h3>            
        </div>
      );
    }
  }