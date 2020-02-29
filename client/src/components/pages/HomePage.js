import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import AsyncSelect from 'react-select/async';
import Select from "react-select";
@inject('appStore')
@observer

export default class HomePage extends Component {

    componentDidMount() {
      this.props.appStore.getSummary();
      this.props.appStore.getStreets();
    }



    render() {
// const link = .replace(/\s/g, "_");
// const streets = this.props.appStore.streets.map(s => ({
//       label: s,
//       value: s
//     }));

      return (
        <div>
          <h1>Home</h1>
          <div
        className="dropdown"
        style={{
          dispay: "inline-block",
          width: 250,
          paddingLeft: 50,
          paddingTop: 50
        }}
      >
        <Select
          options={this.props.appStore.streetsOptions}
          // value={this.this.props.appStore.streetsOptions.filter(({value}) => value === this.props.appStore.selectedStreet)}
          onChange={this.props.appStore.streetsHandleChange}
          // isMulti
          placeholder="Wybierz ulicę"
        />

        <Select
          options={this.props.appStore.numbersOptions}
          // value={this.this.props.appStore.streetsOptions.filter(({value}) => value === this.props.appStore.selectedStreet)}
          onChange={this.props.appStore.numbersHandleChange}

          // isMulti
          placeholder="Wybierz numer"
        />
        <button onClick={this.props.appStore.handleClick} >
        <Link to={'/search/' + this.props.appStore.selectedStreet}>Filtruj</Link>

        </button>
      </div>

          <ul >
			{this.props.appStore.summary.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Brak DGO: {item.DGO}</li>)}
		</ul>
        </div>
      );
    }
  }