import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { product } from '../../classes/product'
import { User } from '../../classes/user'
import Deleter from '../components/Deleter'
import Paginator from '../components/Paginator'
import Wrapper from '../Wrapper'

class Products extends Component<{ user: User }> {
  state = {
    product: []
  }
  last_page = 0;
  current_page = 1;

  handlePageChange = async (page: number) => {
    this.current_page = page;
    await this.componentDidMount();
  }

  componentDidMount = async () => {
    const response = await axios.get(`product?page=${this.current_page}`);
    this.last_page = response.data.meta.last_page

    const products = response.data.data
    this.setState({
      product: products
    })
  }

  handleDeleteProduct = async (id: number) => {
    this.setState({
      product: this.state.product.filter((product: product) => product.id !== id)
    })
  }

  action = (id: number) => {
    if (this.props.user.canEdit('products')) {
      return (
        <div className="btn-group mr-2">
          <Link to={`/product/${id}/edit`} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
          <Deleter id={id} endpoint={'product'} handleDeleteRecord={this.handleDeleteProduct} />
        </div>
      )
    }
  }

  render() {
    let addButton = null;
    if (this.props.user.canEdit('products')) {
      addButton = (
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={'/product/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
        </div>
      )
    }
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          {addButton}
        </div>
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.product.map((product: product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td><img style={{ width: "3rem" }} src={product.image} /></td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                        {this.action(product.id)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Paginator last_page={this.last_page} handlePageChange={this.handlePageChange} />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, {})(Products);