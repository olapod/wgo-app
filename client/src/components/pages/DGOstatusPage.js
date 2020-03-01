import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

export default class DGOstatusPage extends Component {

   render() {
       let {selectedDGOstatus, selectedUnitsByDGOstatus} = this.props.appStore;
      return (
        <div>
          <h1>Raport ze statusu: {selectedDGOstatus}</h1>
          <ul >
			{selectedUnitsByDGOstatus.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Status: {item.DGO}</li>)}
		</ul>
        </div>
      );
    }
  }