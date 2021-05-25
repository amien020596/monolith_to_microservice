import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../classes/user';
import Wrapper from '../Wrapper';

class Users extends Component {
  state = {
    users: []
  }
  last_page = 0;
  first_page = 1;
  current_page = 1;

  handleNext = async () => {
    if (this.last_page === this.current_page) return;
    this.current_page++;
    await this.componentDidMount()
  }

  handlePrevious = async () => {
    if (this.first_page === this.current_page) return;
    this.current_page--;
    await this.componentDidMount()
  }

  componentDidMount = async () => {
    const response = await axios.get(`users?page=${this.current_page}`);
    this.setState({ users: response.data.data })
    this.current_page = response.data.meta.current_page;
    this.last_page = response.data.meta.last_page;
  }
  handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure want to delete this record?')) {
      await axios.delete(`users/${id}`);

      this.setState({ users: this.state.users.filter((user: User) => user.id !== id) })
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
                          <Link to={'/users/edit'} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
                          <Link to={'/users/delete'} className="btn btn-sm btn-outline-secondary" onClick={() => this.handleDeleteUser(user.id)}>Delete</Link>
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
      <nav>
        <ul className="pagination">
          <li className={this.current_page == this.first_page ? "page-item disabled" : "page-item"}>
            <a href="#" className="page-link" onClick={this.handlePrevious}>Previous</a>
          </li>
          <li className={this.current_page == this.last_page ? "page-item disabled" : "page-item"}>
            <a href="#" className="page-link" onClick={this.handleNext}>Next</a>
          </li>
        </ul>
      </nav>
    </Wrapper>)
  }
}
export default Users;