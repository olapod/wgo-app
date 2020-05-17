import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from '../common/Pagination';

@inject('appStore', 'homePageStore', 'paginationStore')
@observer

export default class DifferencePage extends Component {

  componentDidMount(){
    this.props.homePageStore.getDiffItems(this.props.appStore.selectedPage);
    }

    render() {
       let {selectedUnitsByDiff, selectedDiff } = this.props.homePageStore; 
        let { handlePageClickedDiff } = this.props.paginationStore;
       const pageCountbyDiff = Math.ceil(selectedUnitsByDiff.amount / selectedUnitsByDiff.itemsPerPage);
       if(selectedUnitsByDiff.docs) {
      return (
        <div>
          <h1>Raport z punktów adresowych o różnicy {selectedDiff}</h1>

          <ul >
			{selectedUnitsByDiff.docs.map(item => <li key={item._id}>{item.ulica} {item.nr} Meldunki: {item.meldunki} Deklaracja DGO: {item.osoby} Różnica: {item.roznica} Status: {item.DGO}</li>)}
		</ul>
    <Pagination
    handlePageClick={handlePageClickedDiff} pageCount={pageCountbyDiff} itemsPerPage={selectedUnitsByDiff.itemsPerPage}
    />
        </div>
      );
    }
    else {return (<div>Loading...</div>)}
  }
}