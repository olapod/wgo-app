import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

export default class Summary extends Component {

    // componentDidMount() {
    //   this.props.appStore.getSummary();
    //   this.props.appStore.getStreets();
    // }

    render() {

      return (
        <div>
          <h1>Summary Page</h1>

        </div>
      );
    }
  }