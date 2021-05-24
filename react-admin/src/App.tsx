import React from 'react';
import './App.css';
import Dashboard from './secure/dashboard/Dashboard';
import Users from './secure/users/Users';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';
import axios from 'axios';
import { RedirectToDashboard } from './secure/RedirectToDashboard';

function App() {
  axios.defaults.baseURL = 'http://192.168.100.9:8011/api/';
  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={RedirectToDashboard} />
        <Route path={'/dashboard'} component={Dashboard} />
        <Route path={'/users'} component={Users} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
