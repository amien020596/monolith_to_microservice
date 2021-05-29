import React from 'react';
import { NavLink } from 'react-router-dom';
const Menu = () => (
  <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to={'/dashboard'} className="nav-link" aria-current="page">
            Dashboard
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/users'} className="nav-link" aria-current="page" href="#">
            Users
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/roles'} className="nav-link" aria-current="page" href="#">
            Roles
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/product'} className="nav-link" aria-current="page" href="#">
            Product
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/orders'} className="nav-link" aria-current="page" href="#">
            Orders
            </NavLink>
        </li>
      </ul>
    </div>
  </nav>
)
export default Menu;