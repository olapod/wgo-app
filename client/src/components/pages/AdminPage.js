import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
class AdminPage extends Component {

   componentDidMount() {
      this.props.appStore.getMessage();
    }

    render() {
      return (
        <div>
          <h1>Admin Page</h1>
          <p>{this.props.appStore.message}</p>
        </div>
      );
    }
  }

  export default AdminPage;