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
import Roles from './secure/roles/Roles';
import RolesCreate from './secure/roles/RolesCreate';
import RolesEdit from './secure/roles/RolesEdit';
import Products from './secure/products/Products';
import ProductCreate from './secure/products/ProductCreate';
import ProductEdit from './secure/products/ProductEdit';
import Orders from './secure/orders/Orders';
import OrderItem from './secure/orders/OrderItem';

function App() {
  axios.defaults.baseURL = 'http://192.168.100.9:8011/api/';
  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={RedirectToDashboard} />
        <Route path={'/dashboard'} component={Dashboard} />
        <Route path={'/product'} component={Products} exact={true} />
        <Route path={'/product/create'} component={ProductCreate} />
        <Route path={'/product/:id/edit'} component={ProductEdit} />
        <Route path={'/roles'} component={Roles} exact={true} />
        <Route path={'/roles/:id/edit'} component={RolesEdit} />
        <Route path={'/roles/create'} component={RolesCreate} />
        <Route path={'/users'} exact={true} component={Users} />
        <Route path={'/users/:id/edit'} component={UserUpdate} />
        <Route path={'/users/create'} component={UserCreate} />
        <Route path={'/orders'} exact={true} component={Orders} />
        <Route path={'/orders/:id'} component={OrderItem} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
