import React, { Component } from 'react'

export default class Paginator extends Component<{ last_page: number, handlePageChange: any }>{
  last_page = 0;
  first_page = 1;
  current_page = 1;

  handleNext = () => {
    if (this.last_page === this.current_page) return;
    this.current_page++;
    this.props.handlePageChange(this.current_page)
  }

  handlePrevious = () => {
    if (this.first_page === this.current_page) return;
    this.current_page--;
    this.props.handlePageChange(this.current_page)
  }

  render() {
    return (
      <nav>
        <ul className="pagination">
          <li className={this.current_page === this.first_page ? "page-item disabled" : "page-item"}>
            <a href="#" className="page-link" onClick={this.handlePrevious}>Previous</a>
          </li>
          <li className={this.current_page === this.props.last_page ? "page-item disabled" : "page-item"}>
            <a href="#" className="page-link" onClick={this.handleNext}>Next</a>
          </li>
        </ul>
      </nav>
    )
  }
}
