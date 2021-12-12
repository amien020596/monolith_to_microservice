import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import { permission } from '../../classes/permission';
import Wrapper from '../Wrapper';

export default class RolesEdit extends Component<{ match: any }> {
  state = {
    permissions: [],
    redirect: false,
    role_name: '',
    selected_permission: []
  }
  selected: number[] = [];
  name = '';
  id = 0;

  componentDidMount = async () => {
    this.id = this.props.match.params.id
    const responserole = await axios.get(`roles/${this.id}`);
    const responsepermission = await axios.get('permissions');

    const role = responserole.data.data;
    this.selected = role.permissions.map((permission: permission) => permission.id)

    this.setState({
      permissions: responsepermission.data.data,
      role_name: role.name,
      selected_permission: this.selected
    })

  }

  onHandleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put(`roles/${this.id}`, {
        permissions: this.selected,
        name: this.name
      })

      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ redirect: false })
    }
  }

  check = (id: number) => {
    if (this.isChecked(id)) {
      this.selected = this.selected.filter(selected => selected !== id)
      console.log("selected", this.selected)
      return;
    }
    this.selected.push(id);
    console.log("selected", this.selected)
  }

  isChecked = (id: number) => {
    return this.state.selected_permission.find(selected => selected === id)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/roles'} />
    }
    return (
      <Wrapper>
        <form onSubmit={this.onHandleSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
              <input type="text" id="name" defaultValue={this.name = this.state.role_name} className="form-control " name="first_name" onChange={(e) => this.name = e.target.value} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="permission" className="col-sm-2 col-form-label">Permission</label>
            <div className="col-sm-10">
              {this.state.permissions.map((permission: permission) => {
                return (
                  <div className="form-check form-check-inline col-3" key={permission.id}>
                    <label>{permission.name}</label>
                    <input className="form-check-input" defaultChecked={this.isChecked(permission.id)} value={permission.id} type="checkbox" onChange={() => this.check(permission.id)} />
                  </div>
                )
              })}

            </div>
          </div>
          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    )
  }
}
