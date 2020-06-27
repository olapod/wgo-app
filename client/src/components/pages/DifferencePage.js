import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Table from '../features/Table';
// import { withRouter } from 'react-router-dom'
// import Pagination from '../common/Pagination';
// import Table from 'react-bootstrap/Table';
import './DifferencePage.scss';

@inject('appStore', 'homePageStore', 'paginationStore')
@observer

export default class DifferencePage extends Component {

  componentDidMount(){
    this.props.homePageStore.getDiffItems(this.props.appStore.selectedPage);
    }

  //     componentDidUpdate(prevProps, prevState) {
  //       let {selectedDiff, startAt, limit } = this.props.homePageStore; 
  //       console.log('3: ', startAt, '4: ', this.props.match.params.startAt)
  //       let link = `/raport2/difference/${selectedDiff}/range/${startAt}/${limit}`
  //   if (startAt !== this.props.match.params.startAt && startAt && this.props.match.params.startAt) {
  //     this.props.history.push(`/raport2/difference/${selectedDiff}/range/${startAt}/${limit}`)
  //           console.log('Mam')
  //   }
  // }
    //   // if (this.props.appStore.selectedPage !== prevProps.appStore.selectedPage) {
    //   //   this.props.homePageStore.getDiffItems(this.props.appStore.selectedPage);
    //   // }
    // }   
  
  componentWillUnmount() {
    this.props.homePageStore.resetDiffButton();
  }

    render() {
       let {selectedUnitsByDiff, selectedDiff } = this.props.homePageStore; 
        let { diffHandleTableChange } = this.props.paginationStore;
      //  const pageCountbyDiff = Math.ceil(selectedUnitsByDiff.amount / selectedUnitsByDiff.itemsPerPage);
      
       console.log('URL: ', this.props.match.params, 'Dupa: ', this.props.homePageStore.startAt)
       
       if(selectedUnitsByDiff.docs) {
      return (
        <div className='diffContainer'>
          <h1 className='diffTitle'>Raport z punktów adresowych o różnicy {selectedDiff}</h1>
          <div className='diffTable'>
          
          <Table
            data={ selectedUnitsByDiff.docs }
            // page={ selectedPage }
            // sizePerPage={ selectedUnitsByDiff.itemsPerPage }
            totalSize={selectedUnitsByDiff.amount}
            onTableChange={ diffHandleTableChange }
          />   
         
    </div>
        </div>
      );
    }
    else {return (<div>Loading...</div>)}
  }
}
