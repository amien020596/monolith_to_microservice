import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './secure/dashboard/Dashboard';
import Login from './public/Login';
import OrderItem from './secure/orders/OrderItem';
import Orders from './secure/orders/Orders';
import ProductCreate from './secure/products/ProductCreate';
import ProductEdit from './secure/products/ProductEdit';
import Products from './secure/products/Products';
import Profile from './secure/profile/Profile';
import { RedirectToDashboard } from './secure/RedirectToDashboard';
import Register from './public/Register';
import Roles from './secure/roles/Roles';
import RolesCreate from './secure/roles/RolesCreate';
import RolesEdit from './secure/roles/RolesEdit';
import UserCreate from './secure/users/UserCreate';
import UserUpdate from './secure/users/UserUpdate';
import Users from './secure/users/Users';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = 'http://localhost:8014/api/admin';
  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={RedirectToDashboard} />
        <Route path={'/dashboard'} component={Dashboard} />
        <Route path={'/profile'} component={Profile} />
        <Route path={'/products'} component={Products} exact={true} />
        <Route path={'/products/create'} component={ProductCreate} />
        <Route path={'/products/:id/edit'} component={ProductEdit} />
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
