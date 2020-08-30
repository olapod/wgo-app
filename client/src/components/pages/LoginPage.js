import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Button from 'react-bootstrap/Button';
import './LoginPage.scss';

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
      <div className='loginContainer'>
          <h1 className='loginTitle'>Logowanie do panelu administratora</h1>          
          <form className='loginForm' onSubmit={this.onSubmit}>
            <ul className='formList'>
              <li>
                <input
                type="email"
                name="email"
                placeholder="Wprowadź email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
              </li>
              <li>
                <input
                  type="password"
                  name="password"
                  placeholder="Wprowadź hasło"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </li>
              <li>
                <div className='button_container'>
                  <Button type="submit">        
                    Zaloguj
                  </Button>
                </div>        
              </li>       
            </ul>
          </form>
      </div>
    );
  }
}