import React, { Component } from 'react';
import Header from './header.js';
import Menu from './menu';

export default class App extends Component {
  render() {
    return (
      <div>
      <Header/>
     
        {this.props.children}
      </div>
    );
  }
}
