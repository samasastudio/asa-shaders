import React, { Component } from 'react';
import './FBM.css';

export default class FBM extends Component {
  render() {
    return (
      <main className="fbm">
        <header>
          <h1>
            Sam Johnson
          </h1>
          <h2>
            Software Engineer
          </h2>
        </header>
        <footer>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Contract</a>
        </footer>
      </main>
    )
  }
}
