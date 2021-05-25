import React from 'react';
import './App.css';
import Dashboard from './secure/dashboard/Dashboard';
import Users from './secure/users/Users';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';
import axios from 'axios';
import { RedirectToDashboard } from './secure/RedirectToDashboard';
import UserCreate from './secure/users/UserCreate';
import UserUpdate from './secure/users/UserUpdate';

function App() {
  axios.defaults.baseURL = 'http://192.168.100.9:8011/api/';
  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/users'} exact={true} component={Users} />
        <Route path={'/'} exact component={RedirectToDashboard} />
        <Route path={'/dashboard'} component={Dashboard} />
        <Route path={'/users/create'} component={UserCreate} />
        <Route path={'/users/:id/edit'} component={UserUpdate} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
