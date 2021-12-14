import { useEffect, useState } from "react";

import Wrapper from "./Wrapper";
import axios from "axios";
import { product } from "../classes/product";

function Main() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('tokeninfluencer')}`;
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get(`products?s=${searchText}`)
      .then(response => {
        console.log("response", response)
        setProducts(response.data.data)
      }).catch(error => {

      });
  }, [searchText])

  const search = (value: string) => {
    console.log("value search", value)
    setSearchText(value)
  }

  return (
    <Wrapper>
      <div className="row">
        <div className="col-md-12">
          <input type="text" className="form-control" placeholder="Search by title or description"
            onKeyUp={e => search((e.target as HTMLInputElement).value)} />
        </div>

        {products.map((product: product) => {
          return (
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img src={product.image} height="200" />
                <div className="card-body">
                  <p className="card-text">{product.title}</p>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-muted">${product.price}</small>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}
export default Main;