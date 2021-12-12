import axios from 'axios';
import React, { Component } from 'react'

export default class Deleter extends Component<{ id: number, endpoint: string, handleDeleteRecord: any }>{
  handleDelete = async () => {
    if (window.confirm('Are you sure to delete this record?')) {
      await axios.delete(`${this.props.endpoint}/${this.props.id}`);
      this.props.handleDeleteRecord(this.props.id)
    }
  }

  render() {
    return (
      <div>
        <a className="btn btn-sm btn-outline-secondary" onClick={this.handleDelete}>Delete</a>
      </div>
    )
  }
}
