import React, { Component } from 'react';

export default class HomePage extends Component {
      constructor() {
      super();
      //Set default message
      this.state = {
        message: []
      }
    }
    componentDidMount() {
      //GET message from server using fetch api
      fetch('/api/getData')
        .then(res => res.json())
        .then(json => this.setState({message: json}));

    }

    render() {
      console.log("Wynik: ", this.state.message);
      return (
        <div>
          <h1>Home</h1>
          <p>Dupa
            {/* {this.state.message} */}
            </p>
        </div>
      );
    }
  }