import './Public.css';
import React, { Component, SyntheticEvent } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';
import { threadId } from 'worker_threads';

class Login extends Component {
  email = '';
  password = '';
  state = {
    redirect: false
  }

  handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.post('login', {
      email: this.email,
      password: this.password
    })
    localStorage.setItem('token', response.data.token)
    setTimeout(() => {
      this.setState({
        redirect: true
      })
    }, 500)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/'} />
    }
    return (
      <main className="form-signin">
        <form onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" onChange={e => this.email = e.target.value} placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" onChange={e => this.password = e.target.value} placeholder="Password" />
            <label htmlFor="floatingPassword" >Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
    )
  }
}
export default Login;