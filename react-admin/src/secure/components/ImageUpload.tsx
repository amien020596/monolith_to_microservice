import axios from 'axios';
import React, { Component } from 'react'

export default class ImageUpload extends Component<{ image: any, imageUploaded: any }>{
  image = '';

  upload = async (files: FileList | null) => {
    if (files === null) return;

    const data = new FormData();
    data.append('images', files[0]);
    const response = await axios.post('upload', data);
    this.image = response.data.url;

    this.props.imageUploaded(this.image)
  }

  render() {
    return (
      <div className="form-group">
        <label>Image</label>
        <div className="input-group">
          <input type="text" className="form-control" value={this.image = this.props.image} name="image" onChange={e => this.image = e.target.value} />
          <div className="input-group-append">
            <label className="btn btn-primary">
              Upload <input type="file" hidden onChange={e => this.upload(e.target.files)} />
            </label>
          </div>
        </div>
      </div>
    )
  }
}
