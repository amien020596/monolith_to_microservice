import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Order } from '../../classes/order';
import Paginator from '../components/Paginator';
import Wrapper from '../Wrapper'

export default class Orders extends Component {
  state = {
    orders: [],
    last_page: 0,
    current_page: 0,

  }
  last_page = 0;
  first_page = 1;
  current_page = 1;

  componentDidMount = async () => {
    const response = await axios.get(`orders?page=${this.current_page}`);
    const responseOrders = response.data.data;
    const responseMeta = response.data.meta;

    this.setState({
      orders: responseOrders,
      current_page: responseMeta.current_page,
      last_page: responseMeta.last_page,
    })
  }

  handlePageChange = async (page: number) => {
    this.current_page = page;
    await this.componentDidMount();
  }

  render() {
    return (
      <Wrapper>
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.orders.map((order: Order, index) => {
                    return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.first_name} {order.last_name}</td>
                        <td>{order.email}</td>
                        <td>{order.total}</td>
                        <td>
                          <div className="btn-group mr-2">
                            <Link to={`/orders/${order.id}`} href="#" className="btn btn-sm btn-outline-secondary">View</Link>
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
        <Paginator last_page={this.last_page} handlePageChange={this.handlePageChange} />
      </Wrapper>
    )
  }
}
