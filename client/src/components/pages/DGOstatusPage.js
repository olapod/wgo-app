import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from '../common/Pagination';

@inject('appStore', 'homePageStore')
@observer

export default class DGOstatusPage extends Component {
componentDidMount(){
    this.props.homePageStore.getDGOStatusItems(this.props.appStore.selectedPage);
    }

    render() {
       let { handlePageClickedDGOStatus} = this.props.appStore;
       let { selectedUnitsByDGOstatus, selectedDGOstatus } = this.props.homePageStore;
       const pageCountbyDGOStatus = Math.ceil(selectedUnitsByDGOstatus.amount / selectedUnitsByDGOstatus.itemsPerPage);
       if(selectedUnitsByDGOstatus.docs) {
      return (
        <div>
          <h1>Raport ze statusu: {selectedDGOstatus}</h1>

          <ul >
			{selectedUnitsByDGOstatus.docs.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Status: {item.DGO}</li>)}
		</ul>
    <Pagination
    handlePageClick={handlePageClickedDGOStatus} pageCount={pageCountbyDGOStatus} itemsPerPage={selectedUnitsByDGOstatus.itemsPerPage}
    />
        </div>
      );
    }
    else {return (<div>Loading...</div>)}
  }
}
