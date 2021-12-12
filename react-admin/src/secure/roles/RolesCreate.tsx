import axios from 'axios'
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router'
import { permission } from '../../classes/permission'
import Wrapper from '../Wrapper'

export default class RolesCreate extends Component {
  state = {
    permissions: [],
    redirect: false
  }
  selected: number[] = [];
  name = '';

  componentDidMount = async () => {
    const responsepermission = await axios.get('permissions');
    console.log("responsepermission", responsepermission)
    this.setState({
      permissions: responsepermission.data.data
    })

  }

  onHandleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('roles', {
        permissions: this.selected,
        name: this.name
      })

      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ redirect: false })
    }
  }

  check = (id: number) => {
    if (this.selected.find(selected => selected === id)) {
      this.selected = this.selected.filter(selected => selected !== id)
      return;
    }
    this.selected.push(id);
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
              <input type="text" id="name" className="form-control " name="first_name" onChange={(e) => this.name = e.target.value} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="permission" className="col-sm-2 col-form-label">Permission</label>
            <div className="col-sm-10">
              {this.state.permissions.map((permission: permission) => {
                return (
                  <div className="form-check form-check-inline col-3" key={permission.id}>
                    <label>{permission.name}</label>
                    <input className="form-check-input" value={permission.id} type="checkbox" onChange={() => this.check(permission.id)} />
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
