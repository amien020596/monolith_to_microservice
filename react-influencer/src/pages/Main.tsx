import { useEffect, useState } from "react";

import Header from "../components/Header";
import Wrapper from "./Wrapper";
import axios from "axios";
import { constants } from "../constants";
import { product } from "../classes/product";

function Main() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('tokeninfluencer')}`;
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState([]);
  const [alert, setAlert] = useState({
    message: '',
    error: false,
    notify: false
  })
  useEffect(() => {
    axios.get(`products?s=${searchText}`)
      .then(response => {

        setProducts(response.data.data)
      }).catch(error => {

      });
  }, [searchText])

  const search = (value: string) => setSearchText(value)
  const isSelected = (id: number) => selected.includes(id);
  const select = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id))

    }
    setSelected([...selected, id])
  }
  let button, info;
  if (selected.length > 0) {
    button = (
      <div className="input-group-append">
        <button className="btn btn-info" onClick={() => generate()}>Generate Link</button>
      </div>
    )
  }

  const generate = () => {
    axios.post('links', {
      products: selected
    }).then(response => {
      setAlert({
        message: `Link generated : ${constants.CHECKOUT_URL}/${response.data.data.code}`,
        error: false,
        notify: true
      })
    }).catch(error => {
      setAlert({
        message: 'You should be login to generate link',
        error: true,
        notify: true
      })
    }).finally(() => {
      setTimeout(() => {
        setAlert({
          message: '',
          error: false,
          notify: false
        })
      }, 2000);
    })
  }
  if (alert.notify) {
    info = (
      <div className="col-md-12 mb-4">
        <div className={alert.error ? "alert alert-danger" : "alert alert-info"} role="alert">
          {alert.message}
        </div>
      </div>
    )
  }
  return (
    <Wrapper>
      <main role="main">

        <Header />
      </main>
      <div className="row">
        {info}
        <div className="col-md-12">
          <input type="text" className="form-control" placeholder="Search by title or description"
            onKeyUp={e => search((e.target as HTMLInputElement).value)} />
          {button}
        </div>
        {products.map((product: product, index) => {
          return (
            <div className="col-md-4" key={index}>
              <div className={isSelected(product.id) ? "card mb-4 shadow-sm selected" : "card mb-4 shadow-sm "} onClick={() => select(product.id)}>
                <img src={product.image} height="200" />
                <div className="card-body">
                  <p className="card-text">{product.title}</p>
                  {/* <p className="card-text">{product.description}</p> */}
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