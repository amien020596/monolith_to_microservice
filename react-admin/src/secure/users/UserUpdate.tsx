import axios from 'axios';
import React, { Component, PropsWithRef, SyntheticEvent } from 'react'
import { Redirect } from 'react-router'
import { role } from '../../classes/role';
import Wrapper from '../Wrapper'

export default class UserUpdate extends Component<{ match: PropsWithRef<any> }> {
  state = {
    redirect: false,
    roles: [],
    first_name: '',
    last_name: '',
    role_id: 0,
    email: '',
  }
  id = 0;
  first_name = '';
  last_name = '';
  role_id = 0;
  email = '';
  password = '';
  password_confirm = '';

  componentDidMount = async () => {
    this.id = this.props.match.params.id
    const response = await axios.get('roles')
    const responseuser = await axios.get(`users/${this.id}`)
    const responseuserdata = responseuser.data.data;
    console.log("responseuserdata", responseuserdata)

    this.setState({
      roles: response.data.data,
      first_name: responseuserdata.first_name,
      last_name: responseuserdata.last_name,
      email: responseuserdata.email,
      role_id: responseuserdata.role.id,
    })

  }

  onHandleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put(`users/${this.id}`, {
        first_name: this.first_name,
        last_name: this.last_name,
        role_id: this.role_id,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm
      })

      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ redirect: false })
    }

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/users'} />
    }
    return (
      <Wrapper>
        <form onSubmit={this.onHandleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" className="form-control" defaultValue={this.first_name = this.state.first_name} onChange={e => this.first_name = e.target.value} name="first_name" />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" className="form-control" name="last_name" defaultValue={this.last_name = this.state.last_name} onChange={e => this.last_name = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" name="email" defaultValue={this.email = this.state.email} onChange={e => this.email = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" name="password" onChange={e => this.password = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirm">Password Confirm</label>
            <input type="password" id="password_confirm" className="form-control" name="password_confirm" onChange={e => this.password_confirm = e.target.value} />
          </div>
          <div className="form-group">
            <label htmlFor="select_role">Role</label>
            <select name="role_id" id="select_role" className="form-control" value={this.role_id = this.state.role_id} onChange={e => {
              this.role_id = parseInt(e.target.value)
              this.setState({
                role_id: this.role_id
              })
            }}>
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
