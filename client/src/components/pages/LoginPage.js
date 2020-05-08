import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
 
  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/admin');
        this.props.appStore.getEmail(this.state.email);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Błąd logowania. Spróbuj ponownie!');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Logowanie do panelu administratora</h1>
        <input
          type="email"
          name="email"
          placeholder="Wprowadź email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Wprowadź hasło"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
       <input type="submit" value="Wyślij"/>
      </form>
    );
  }
}