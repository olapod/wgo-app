import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

export default class HomePage extends Component {

    componentDidMount() {
      this.props.appStore.getSummary();
      this.props.appStore.getStreets();
    }

    render() {
      console.log("CO: ", this.props.appStore.streets)
      return (
        <div>
          <h1>Home</h1>
          <ul >
			{this.props.appStore.summary.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Brak DGO: {item.DGO}</li>)}
		</ul>
        </div>
      );
    }
  }