import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../classes/user';
import Paginator from '../components/Paginator';
import Wrapper from '../Wrapper';

class Users extends Component {
  state = {
    users: []
  }
  last_page = 0;
  first_page = 1;
  current_page = 1;

  handlePageChange = async (page: number) => {
    this.current_page = page;
    await this.componentDidMount();
  }

  componentDidMount = async () => {
    const response = await axios.get(`users?page=${this.current_page}`);
    this.setState({ users: response.data.data })
    this.current_page = response.data.meta.current_page;
    this.last_page = response.data.meta.last_page;
  }
  handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure want to delete this record?')) {

      this.setState({ users: this.state.users.filter((user: User) => user.id !== id) })
      await axios.delete(`users/${id}`);
    }
  }
  render() {
    return (<Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={'/users/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
        </div>
      </div>
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map((user: User, index) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.role.name}</td>
                      <td>
                        <div className="btn-group mr-2">
                          <Link to={`/users/${user.id}/edit`} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
                          <a className="btn btn-sm btn-outline-secondary" onClick={() => this.handleDeleteUser(user.id)}>Delete</a>
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

      <Paginator last_page={this.last_page} handlePageChange={this.handlePageChange} />
    </Wrapper>)
  }
}
export default Users;