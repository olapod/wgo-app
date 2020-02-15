import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

export default class HomePage extends Component {

    componentDidMount() {
      this.props.appStore.getSummary()
    }

    render() {
      console.log("CO: ", this.props.appStore.summary)
      return (
        <div>
          <h1>Home</h1>
          <ul >
			{this.props.appStore.summary.map(item => <li key={item._id}>{item.ulica} {item.nr}</li>)}
		</ul>
        </div>
      );
    }
  }