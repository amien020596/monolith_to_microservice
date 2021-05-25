import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import Wrapper from '../Wrapper'

export default class ProductCreate extends Component {
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

  upload = async (files: FileList | null) => {
    if (files === null) return;

    const data = new FormData();
    data.append('images', files[0]);
    console.log("data", data)
    const response = await axios.post('upload', data);
    this.image = response.data.url;

    this.setState({ image: this.image })
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
          <div className="form-group">
            <label>Image</label>
            <div className="input-group">
              <input type="text" className="form-control" value={this.image = this.state.image} name="image" onChange={e => this.image = e.target.value} />
              <div className="input-group-append">
                <label className="btn btn-primary">
                  Upload <input type="file" hidden onChange={e => this.upload(e.target.files)} />
                </label>
              </div>
            </div>
          </div>
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
