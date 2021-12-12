import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import ImageUpload from '../components/ImageUpload';
import Wrapper from '../Wrapper'

export default class ProductEdit extends Component<{ match: any }>{
  state = {
    redirect: false,
    image: '',
    title: '',
    price: 0,
    description: ''
  }
  id = 0;
  title = '';
  description = '';
  price = 0;
  image = '';
  redirect = false;

  componentDidMount = async () => {
    this.id = this.props.match.params.id;
    const response = await axios.get(`product/${this.id}`)
    const responseProduct = response.data.data;
    this.setState({
      title: responseProduct.title,
      description: responseProduct.description,
      price: responseProduct.price,
      image: responseProduct.image
    })
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      axios.put(`product/${this.id}`, {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        image: this.state.image,
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
            <input type="text" defaultValue={this.state.title} className="form-control" name="title" onChange={e => {
              this.title = e.target.value
              this.setState({ title: this.title })
            }} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" defaultValue={this.state.description} name="description" onChange={e => {
              this.description = e.target.value
              this.setState({
                description: this.description
              })
            }} />
          </div>
          <ImageUpload image={this.state.image} imageUploaded={this.upload} />
          <div className="form-group">
            <label>Price</label>
            <input type="number" className="form-control" value={this.state.price} name="price" onChange={e => {
              this.price = parseFloat(e.target.value)
              this.setState({ price: this.price })
            }} />
          </div>
          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    )
  }
}
