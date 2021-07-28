import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { orderItem } from '../../classes/order_item';
import Wrapper from '../Wrapper'

export default class OrderItem extends Component<{ match: any }> {
  state = {
    order_item: []
  }
  id = 0;

  componentDidMount = async () => {
    this.id = this.props.match.params.id;
    const response = await axios.get(`orders/${this.id}`);
    const responseDataOrder = response.data.data;

    this.setState({
      order_item: responseDataOrder.order_item
    })
  }

  handleExport = async () => {
    const response = await axios.get('export', { responseType: 'blob' })
    const blob = new Blob([response.data], { type: 'text/csv' });
    const downloadURL = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'order.csv';
    link.click();
  }

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <a onClick={this.handleExport} className="btn btn-sm btn-outline-secondary">Export CSV</a>
          </div>
        </div>
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.order_item.map((orderItem: orderItem, index) => {
                    return (
                      <tr key={orderItem.id}>
                        <td>{orderItem.id}</td>
                        <td>{orderItem.product_title}</td>
                        <td>{orderItem.price}</td>
                        <td>{orderItem.quantity}</td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      </Wrapper>
    )
  }
}
