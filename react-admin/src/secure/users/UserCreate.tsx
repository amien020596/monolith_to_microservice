import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import { role } from '../../classes/role';
import Wrapper from '../Wrapper'

export default class UserCreate extends Component {
  state = {
    redirect: false,
    roles: []
  }
  email = '';
  last_name = '';
  first_name = '';
  password = '';
  password_confirm = '';
  role_id = 0;

  componentDidMount = async () => {
    const response = await axios.get('roles');
    this.setState({
      roles: response.data.data
    })
  }

  onHandleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('users', {
        email: this.email,
        last_name: this.last_name,
        first_name: this.first_name,
        password: this.password,
        password_confirm: this.password_confirm,
        role_id: this.role_id
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ redirect: false })
    }


  }

  render() {
    console.log("this.state.redirect", this.state.redirect)
    if (this.state.redirect) {
      return <Redirect to={'/users'} />
    }
    return (
      <Wrapper>
        <form onSubmit={this.onHandleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" className="form-control" onChange={e => this.first_name = e.target.value} name="first_name" />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" className="form-control" name="last_name" onChange={e => this.last_name = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" name="email" onChange={e => this.email = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" name="email" onChange={e => this.password = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirm">Password Confirm</label>
            <input type="password" id="password_confirm" className="form-control" name="email" onChange={e => this.password_confirm = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="select_role">Role</label>
            <select name="role_id" id="select_role" className="form-control" onChange={e => this.role_id = parseInt(e.target.value)}>
              <option>Select Role</option>
              {this.state.roles.map((role: role) => {
                return <option key={role.id} value={role.id}>{role.name}</option>
              })}
            </select>
          </div>
          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    )
  }
}
