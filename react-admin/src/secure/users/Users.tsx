import React, { Component } from 'react';

import Deleter from '../components/Deleter';
import { Link } from 'react-router-dom';
import Paginator from '../components/Paginator';
import { User } from '../../classes/user';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import constants from '../../constants';
>>>>>>> section_8_users_microservice

class Users extends Component<{ user: User }> {
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
<<<<<<< HEAD
    axios.defaults.baseURL = 'http://localhost:8014/api/admin';
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.get(`users?page=${this.current_page}`);
=======
    const response = await axios.get(`${constants.BASE_URL}/admin/users?page=${this.current_page}`);
>>>>>>> section_8_users_microservice
    this.setState({ users: response.data.data })
    this.current_page = response.data.meta.current_page;
    this.last_page = response.data.meta.last_page;
  }
  handleDeleteUser = async (id: number) => {
    this.setState({ users: this.state.users.filter((user: User) => user.id !== id) })
  }

  actions = (id: number) => {
    if (this.props.user.canEdit('users')) {
      return (
        <div className="btn-group mr-2">
          <Link to={`/users/${id}/edit`} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
          <Deleter id={id} endpoint={'users'} handleDeleteRecord={this.handleDeleteUser} />
        </div>
      )
    }
  }

  render() {
    let addButton = null
    if (this.props.user.canEdit('users')) {
      addButton = (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={'/users/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
          </div>
        </div>
      )
    }

    return (
      <Wrapper>
        {addButton}
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
                          {this.actions}
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
const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, {})(Users);