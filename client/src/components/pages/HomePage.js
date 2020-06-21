import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import AsyncSelect from 'react-select/async';
import Select from "react-select";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import Button from 'react-bootstrap/Button';
import Spinner from '../common/Spinner';
import { CSVLink } from "react-csv";
import './HomePage.scss';
// import history from "../../history";

const DGOoptions = [
  { value: 'złożona deklaracja odpadowa', label: 'złożona deklaracja odpadowa' },
  { value: 'niezłożona deklaracja odpadowa', label: 'niezłożona deklaracja odpadowa' },
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

    // historyHandleClick = (e) => {
    //   e.preventDefault();
    //   let {selectedDiff, startAt, limit} = this.props.homePageStore;
    //   history.push(`/raport2/difference/${selectedDiff}/range/${startAt + 1}/${startAt + limit}`)
    
    // }

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
      diffDisabled,
      recordDisabled,
      statusDisabled,
      startAt,
      limit    
        } = this.props.homePageStore;

    let {loading} = this.props.appStore;
    // let diffDisabled 
    // if (selectedDiff === null ) {
    //   diffDisabled = false}
    //   else {diffDisabled = true}
    
    // const selectStyle = {
    //   control: base => ({
    //     ...base,
    //     border: '1px solid #343a40',
    //     marginBottom: 5,
    //     // This line disable the blue border
    //     boxShadow: 'none'
    //   })
    // };

    let downloadLink;
    console.log('What: ', selectedDGOstatus, 'Co: ', statusDisabled)
    // console.log('Loading: ', loading, 'Selected Number: ', selectedNumber)
      
    if (summary.length === 0 && loading === true) {
      downloadLink = <Spinner />
    } if (summary.length > 0 && loading === true) {
      downloadLink  = <CSVLink data={summary}>Baza gotowa do pobrania</CSVLink>
    }
    if (summary.length === 0 && loading === false) {
      downloadLink  = <Button className='csvButton' onClick={getSummary}> Pobierz bazę</Button>
    }

      return (
        <div className='titleContainer'>
          <h1 className='title'>Aplikacja do raportowania różnic w osobach zgłoszonych do deklaracji odpadowych i bazy ELUD</h1>
          <Container>
            <Row>
              <Col className='column'>
         <form>
         <h3>Raport dla punktu adresowego</h3>
        <Select className='selector'
          options={streetsOptions}
          // value={this.streetsOptions.filter(({value}) => value === selectedStreet)}
          onChange={streetsHandleChange}
          // isMulti
          placeholder="Wybierz ulicę"
          noOptionsMessage={() => 'BRAK DANYCH'}          
        />

        <Select
          options={numbersOptions}
          // defaultValue={numbersOptions[0]}
          onChange={numbersHandleChange}

          // isMulti
          placeholder="Wybierz numer"
          noOptionsMessage={() => 'BRAK DANYCH'} 
          // styles={selectStyle}
        />
        <div className='d-flex justify-content-center'>
        <Button className={recordDisabled ? 'buttonInactive' : 'buttonActive'} onClick={recordHandleClick} >
        <Link to={recordDisabled ? '#' :'/raport/' + selectedStreet +'/'+ selectedNumber}>Filtruj</Link>

        </Button>
        </div>
      </form>
          </Col>
          <Col className='column'>
             <form>
             <h3>Raport wg różnic w obu bazach</h3>
        <Select
          options={diffOptions}
          // value={this.streetsOptions.filter(({value}) => value === selectedStreet)}
          onChange={diffHandleChange}
          // isMulti
          placeholder="Wybierz różnicę"
          noOptionsMessage={() => 'BRAK DANYCH'} 
        />
        <div className='d-flex justify-content-center diffButton'>
        <Button className={diffDisabled ? 'buttonInactive' : 'buttonActive'} >
        {/* <Link to={diffDisabled ? '#' : '/raport2/difference/' + selectedDiff + '/range/' + startAt + '/' + startAt+ 1 + limit}>Filtruj</Link> */}
        <Link to={diffDisabled ? '#' :`/raport2/difference/${selectedDiff}/range/${startAt + 1}/${startAt + limit}`}>Filtruj</Link>
        </Button>
        </div>
      </form>
      <p>Różnica na plus oznacza więcej meldunków niż deklaracji. Różnica na minus oznacza więcej deklaracj niż meldunków.</p>
          </Col>
          <Col className='column'>
             <form>
             <h3>Raport wg złożonych / niezłożonych deklaracji</h3>
        <Select
          options={DGOoptions}
          // value={this.streetsOptions.filter(({value}) => value === selectedStreet)}
          onChange={DGOhandleChange}
          // isMulti
          placeholder="Status deklaracji odpadowej"
          noOptionsMessage={() => 'BRAK DANYCH'} 
        />
        <div className='d-flex justify-content-center statusButton'>
        <Button className={statusDisabled ? 'buttonInactive' : 'buttonActive'} onClick={DGOhandleClick} >
        <Link to={statusDisabled ? '#' :'/raport3/status/' + selectedDGOstatus}>Filtruj</Link>

        </Button>
        </div>
      </form>
          </Col>
        </Row>
      </Container>
      <Container className='text-center mt-5'>
        <div className='csvTitle'><p>Pobierz całą bazę w formacie CSV</p></div>
        <div className='downloadLink'>
          {downloadLink}
        </div>
        
      </Container>
      
      
     
          {/* <ul >
			{summary.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Status: {item.DGO}</li>)}
		</ul> */}
        </div>
      );
    }
  }