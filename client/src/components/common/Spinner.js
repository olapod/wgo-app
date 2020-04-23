import React from "react";
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

class Spinner extends React.Component {

render() {
      return (
        <div className="spinner">
          <h5 className="spinner-title">Przetwarzam żądanie...</h5>
          <SyncLoader
            css={override}
            size={25}
            color={"#3f51b5"}
          />
        </div>
    )};

};
export default Spinner;