import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './LogoutPage.scss';

// @inject('routing')
@inject('appStore')
@observer

export default class Logout extends Component {

    componentDidMount() {
      this.props.appStore.logOut();      
    }
    render() {
        return (
    <div className='logout_container'>
        <h1>Wylogowano z panelu administratora!</h1>
        <FontAwesomeIcon
			icon={faSignOutAlt  }
            style={{color: '#343a40', fontSize: 80, textAlign: 'center'}}/>
    </div>
     )
    }
};

