import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import ReactPaginate from 'react-paginate';
import './Pagination.scss';

@inject('appStore')
@observer

class Pagination extends Component {

	render () {
		// let {selectedUnitsByDiff} = this.props.appStore


		return (
<ReactPaginate
  previousLabel={'poprzedni'}
  nextLabel={'następny'}
  breakLabel={'...'}
  breakClassName={'break-me'}
  pageCount={this.props.pageCount}
  marginPagesDisplayed={4}
  pageRangeDisplayed={this.props.itemsPerPage}
  onPageChange={this.props.handlePageClick}
  containerClassName={'pagination'}
  subContainerClassName={'pages pagination'}
  activeClassName={'active'}
  />

		)
	}
}

export default Pagination;

// const Pagination = (props) => {
// 	let {selectedUnitsByDiff} = this.props.appStore
// 	const pageCount = Math.ceil(selectedUnitsByDiff.amount / selectedUnitsByDiff.itemsPerPage)
// return (

// <ReactPaginate
//   previousLabel={'previous'}
//   nextLabel={'next'}
//   breakLabel={'...'}
//   breakClassName={'break-me'}
//   pageCount={pageCount}
//   marginPagesDisplayed={2}
//   pageRangeDisplayed={selectedUnitsByDiff.itemsPerPage}
//   onPageChange={props.handlePageClick}
//   containerClassName={'pagination'}
//   subContainerClassName={'pages pagination'}
//   activeClassName={'active'}
//   />

//  )
// }
// export default Pagination