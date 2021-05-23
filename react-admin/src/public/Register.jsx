import React, { Component } from 'react'
import './Public.css';

export default class Register extends Component {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  password_confirm = '';

  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log({
      'first_name': this.first_name,
      'last_name': this.last_name,
      'email': this.email,
      'password': this.password,
      'password_confirm': this.password_confirm
    })
  }
  render() {
    return (
      <main className="form-signin">
        <form onSubmit={this.handleSubmitForm}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => this.email = e.target.value} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" onChange={e => this.first_name = e.target.value} />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" onChange={e => this.last_name = e.target.value} />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>

          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => this.password = e.target.value} />
            <label htmlFor="floatingPassword" >Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="PasswordConfirm" placeholder="Password Confirm" onChange={e => this.password_confirm = e.target.value} />
            <label htmlFor="PasswordConfirm" >Password Confirm</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
        </form>
      </main>
    )
  }
}
