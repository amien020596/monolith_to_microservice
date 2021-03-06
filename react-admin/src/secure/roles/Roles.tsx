import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { role } from '../../classes/role'
import Deleter from '../components/Deleter'
import Wrapper from '../Wrapper'

export default class Roles extends Component {
  state = {
    roles: []
  }

  componentDidMount = async () => {
    const responseroles = await axios.get('roles');
    this.setState({ roles: responseroles.data.data })

  }

  handleDeleteRole = async (id: number) => {
    this.setState({
      roles: this.state.roles.filter((role: role) => role.id !== id)
    })
  }

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={'/roles/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
          </div>
        </div>
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.roles.map((role: role, index) => {
                    return (
                      <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                          <div className="btn-group mr-2">
                            <Link to={`/roles/${role.id}/edit`} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <Deleter id={role.id} endpoint={'roles'} handleDeleteRecord={this.handleDeleteRole} />
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      </Wrapper>
    )
  }
}
