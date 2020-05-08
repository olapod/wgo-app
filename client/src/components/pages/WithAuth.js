import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    // constructor() {
    //   super();
    //   this.state = {
    //     loading: true,
    //     redirect: false,
    //   };
    // }
    componentDidMount() {
      fetch('/api/checkToken')
        .then(res => {
          if (res.status === 200) {
            // this.setState({ loading: false });
            this.props.appStore.logIn();
            // this.props.appStore.getUser();
            console.log('Zaloogowany: ', res.status)
          }
          else {
            const error = new Error(res.error);
            console.error("Error checkToken api", res.status);
            throw error;
            
          }
        })
        .catch(err => {
          console.error(err);
          // this.setState({ loading: false, redirect: true });
          this.props.appStore.reDirect();
        });
    }
    render() {
      // const { loading, redirect } = this.state;  
          const {login, redirect } = this.props.appStore;
      console.log('Spr: ', login, redirect)
      // if (loading) {
      if (!login) {
        return null;
        
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
      // return <Redirect to="/admin" />;
    }
  }
}