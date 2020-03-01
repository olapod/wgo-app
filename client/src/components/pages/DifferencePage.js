import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

export default class DifferencePage extends Component {

   render() {
       let {selectedUnitsByDiff, selectedDiff} = this.props.appStore;
      return (
        <div>
          <h1>Raport z punktów adresowych o różnicy {selectedDiff}</h1>
          <ul >
			{selectedUnitsByDiff.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Status: {item.DGO}</li>)}
		</ul>
        </div>
      );
    }
  }