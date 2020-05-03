import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

export default class Logout extends Component {

    componentDidMount() {
      this.props.appStore.logOut();      
    }

    render() {
        return (
    <div>
        <h1>Wylogowano z panelu administratora!</h1>
    </div>
     )
    }
};

