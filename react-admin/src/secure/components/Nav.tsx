import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Nav extends Component {
  state = {
    redirect: true
  }

  onHandleClick = () => {
    localStorage.clear();
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      <Redirect to={'login'} />
    }
    return (
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" >
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#" onClick={this.onHandleClick}>Sign out</a>
          </li>
        </ul>
      </header>
    )
  }

}

export default Nav;