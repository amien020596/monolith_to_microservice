import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { role } from '../../classes/role';
import { User } from '../../classes/user';
import { connect } from 'react-redux';

class Nav extends Component<{ user: User }> {
  state = {
    user: new User(0, '', '', '', new role(), []),
    redirect: true,
  }

  onHandleClick = () => {
    localStorage.clear();
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      <Redirect to={'login'} />
    }
    return (
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" >
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
        <ul className="my-2 my-md-0 mr-md-3">
          <Link to={'profile'} className='p-2 text-white'>{this.props.user.name}</Link>
          <Link className="'p-2 text-white" to={'login'} onClick={this.onHandleClick}>Sign out</Link>
        </ul>
      </header>
    )
  }

}

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(Nav);