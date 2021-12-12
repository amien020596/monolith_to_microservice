import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { User } from '../../classes/user';
import Dashboard from '../dashboard/Dashboard';

class Menu extends Component<{ user: User }> {
  menuItem = [

    {
      link: '/users',
      name: 'Users'
    },
    {
      link: '/roles',
      name: 'Roles'
    },
    {
      link: '/products',
      name: 'Products'
    },
    {
      link: '/orders',
      name: 'Orders'
    }
  ]

  render() {

    let menu: JSX.Element[] = [];
    this.menuItem.forEach((item, index) => {
      if (this.props.user.canView(item.name.toLowerCase())) {
        menu.push(
          <li className="nav-item" key={index}>
            <NavLink to={item.link} className="nav-link" aria-current="page">
              {item.name}
            </NavLink>
          </li>
        )
      }
    })
    return (
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item" >
              <NavLink to={'/dashboard'} className="nav-link" aria-current="page">
                Dashboard
              </NavLink>
            </li>
            {menu}
          </ul>
        </div>
      </nav>
    )
  }
}
const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, {})(Menu);