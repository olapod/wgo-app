import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@inject('appStore', 'homePageStore')
@observer

export default class OneRecordPage extends Component {

    render() {
      let {selectedUnitByAddress} = this.props.homePageStore;
      let text;

       if (selectedUnitByAddress.roznica === 0) {
      text = <div><p>Liczba osób zameldowanych jest taka sama jak zgłoszonych do DGO</p><FontAwesomeIcon
								icon={faCheckCircle}/></div>;
    } if (selectedUnitByAddress.roznica > 0) {
      text = <div><p>Liczba osób zameldowanych jest wyższa niż zgłoszonych do DGO o {selectedUnitByAddress.roznica}</p><FontAwesomeIcon
								icon={faExclamationCircle}/></div>;
    } if (selectedUnitByAddress.roznica < 0) {
      text = <div><p>Liczba osób zameldowanych jest niższa niż zgłoszonych do DGO o {selectedUnitByAddress.roznica * -1}</p><FontAwesomeIcon icon={faCheckCircle}/></div>;
      }
      return (
        <div>
          <h1>Raport dla punktu adresowego</h1>
            <h3>{selectedUnitByAddress.ulica} nr: {selectedUnitByAddress.nr}</h3>
            {text}
            <p>Status deklaracji: {selectedUnitByAddress.DGO}</p>
        </div>
      );
    }
  }