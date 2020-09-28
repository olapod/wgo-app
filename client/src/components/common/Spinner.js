import React from "react";
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners";
import { observer, inject } from 'mobx-react';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;
@inject('adminStore')
@observer

class Spinner extends React.Component {

render() {
      return (
        <div className={!this.props.adminStore.dataLoading ? 'spinnerInactive' : 'spinnerActive'}>
          <p className="spinner-title">Przetwarzam żądanie...</p>
          <SyncLoader
            css={override}
            size={25}
            color={"#79969f"}
          />
        </div>
    )};

};
export default Spinner;