import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import ImageUpload from '../components/ImageUpload';
import Wrapper from '../Wrapper'

export default class ProductEdit extends Component {
  state = {
    redirect: false,
    image: ''
  }
  title = '';
  description = '';
  price = 0;
  image = '';
  redirect = false;

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      axios.post('product', {
        title: this.title,
        description: this.description,
        price: this.price,
        image: this.image,
      })
      this.setState({
        redirect: true
      })
    } catch (error) {
      this.setState({
        redirect: false
      })
    }
  }

  upload = (imageurl: string) => {
    this.setState({ image: imageurl })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/product'} />
    }
    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" name="title" onChange={e => this.title = e.target.value} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" onChange={e => this.description = e.target.value} />
          </div>
          <ImageUpload image={this.image = this.state.image} imageUploaded={this.upload} />
          <div className="form-group">
            <label>Price</label>
            <input type="number" className="form-control" name="price" onChange={e => this.price = parseFloat(e.target.value)} />
          </div>
          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    )
  }
}
