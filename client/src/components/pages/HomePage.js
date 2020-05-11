import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import AsyncSelect from 'react-select/async';
import Select from "react-select";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import Spinner from '../common/Spinner';
import { CSVLink } from "react-csv";

const DGOoptions = [
  { value: 'złożona deklaracja DGO', label: 'złożona deklaracja DGO' },
  { value: 'niezłożona deklaracja DGO', label: 'niezłożona deklaracja DGO' },
];

@inject('appStore', 'homePageStore')
@observer

export default class HomePage extends Component {

    componentDidMount() {
      // this.props.appStore.getSummary();
      this.props.homePageStore.getStreets();
      this.props.homePageStore.getDiff();
      
    }

    componentWillUnmount() {
      this.props.appStore.resetLoading();
      this.props.homePageStore.resetSummary();
    }

    diffHandleClick = (e) => {
      e.preventDefault();
      this.props.homePageStore.getDiffItems(this.props.appStore.presentPage)
    }

    render() {
let {streetsOptions,
      summary,
      streetsHandleChange,
      numbersOptions,
      numbersHandleChange,
      recordHandleClick,
      selectedStreet,
      selectedNumber,
      diffOptions,
      // diffHandleClick,
      diffHandleChange,
      selectedDiff,
      selectedDGOstatus,
      DGOhandleChange,
      DGOhandleClick,
      getSummary,
    } = this.props.homePageStore;

    let {loading} = this.props.appStore;

    let downloadLink;
    console.log('Loading: ', loading, 'Summary: ', summary.length)
      
    if (summary.length === 0 && loading === true) {
      downloadLink = <Spinner />
    } if (summary.length > 0 && loading === true) {
      downloadLink  = <CSVLink data={summary}>Baza gotowa do pobrania</CSVLink>
    }
    if (summary.length === 0 && loading === false) {
      downloadLink  = <button onClick={getSummary}> Pobierz bazę</button>
    }

      return (
        <div>
          <h1>Aplikacja do raportowania różnic w osobach zgłoszonych do DGO i bazy ELUD</h1>
          <Container>
            <Row>
              <Col>
         <form>
         <h3>Raport dla punktu adresowego</h3>
        <Select
          options={streetsOptions}
          // value={this.streetsOptions.filter(({value}) => value === selectedStreet)}
          onChange={streetsHandleChange}
          // isMulti
          placeholder="Wybierz ulicę"
        />

        <Select
          options={numbersOptions}
          // value={this.streetsOptions.filter(({value}) => value === selectedStreet)}
          onChange={numbersHandleChange}

          // isMulti
          placeholder="Wybierz numer"
        />
        <button onClick={recordHandleClick} >
        <Link to={'/raport/' + selectedStreet +'/'+ selectedNumber}>Filtruj</Link>

        </button>
      </form>
          </Col>
          <Col>
             <form>
             <h3>Raport wg różnic w meldunkach i deklaracjach GO</h3>
        <Select
          options={diffOptions}
          // value={this.streetsOptions.filter(({value}) => value === selectedStreet)}
          onChange={diffHandleChange}
          // isMulti
          placeholder="Wybierz różnicę"
        />
        <button
        // onClick={this.diffHandleClick}
        >
        <Link to={'/raport2/difference/' + selectedDiff}>Filtruj</Link>

        </button>
      </form>
      <p>Różnica na plus oznacza więcej meldunków niż DGO. Różnica na minus oznacza więcej DGO niż meldunków.</p>
          </Col>
          <Col>
             <form>
             <h3>Raport wg złożonych / niezłożonych deklaracji GO</h3>
        <Select
          options={DGOoptions}
          // value={this.streetsOptions.filter(({value}) => value === selectedStreet)}
          onChange={DGOhandleChange}
          // isMulti
          placeholder="Status deklaracji GO"
        />
        <button onClick={DGOhandleClick} >
        <Link to={'/raport3/status/' + selectedDGOstatus}>Filtruj</Link>

        </button>
      </form>
          </Col>
        </Row>
      </Container>
      
      {downloadLink}
      
     
          {/* <ul >
			{summary.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Status: {item.DGO}</li>)}
		</ul> */}
        </div>
      );
    }
  }