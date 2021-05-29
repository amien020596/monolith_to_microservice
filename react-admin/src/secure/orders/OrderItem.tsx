import axios from 'axios'
import React, { Component } from 'react'
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

  render() {
    return (
      <Wrapper>
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
                  this.state.order_item.map((order: orderItem, index) => {
                    return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.product_title}</td>
                        <td>{order.price}</td>
                        <td>{order.quantity}</td>
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
