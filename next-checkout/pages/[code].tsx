import { useEffect, useState } from 'react';

import Head from 'next/head'
import { SocketAddress } from 'net';
import Stripe from 'stripe';
import Wrapper from '../component/Wrapper'
import axios from 'axios';
import constants from '../constants';
import { useRouter } from 'next/router'

export default function Checkout() {
  const router = useRouter();
  const { code } = router.query;
  const [user, setUser] = useState({ first_name: '', last_name: '' })
  const [products, setProducts] = useState([])
  const [quantities, setQuantities] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    if (code) {
      axios.get(`${constants.endpoint}/links/${code}`)
        .then(response => {
          const data = response.data.data;

          setUser(data.user)
          setProducts(data.products)
          setQuantities(data.products.map(product => {
            return {
              product_id: product.id,
              quantity: 0
            }
          }))
        }).catch(() => { })
    }
  }, [code])
  const quantity = (id: number) => {
    const q = quantities.find(q => q.product_id === id)
    return q ? q.quantity : 0;
  }
  const change = (id: number, quantity: number) => {
    setQuantities(quantities.map(q => {
      if (q.product_id === id) {
        return {
          product_id: id,
          quantity: quantity
        }
      }
      return q
    }))
  }
  const total = () => {
    let t = 0;
    quantities.forEach(q => {
      const product = products.find(p => p.product_id === q.id);
      t += q.quantity * parseFloat(product.price)
    });
    return t;
  }

  function submitdata(e) {
    console.log("e", e)
    e.preventDefault()
    axios.post(`${constants.endpoint}/orders`, {
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'code': code,
      'address': address,
      'address2': address2,
      'city': city,
      'country': country,
      'zip': zip,
      'items': quantities
    }).then(response => {
      console.log("response", response.data)


      window.open(response.data.url)

    }).catch(() => {
      console.log("hello ini error")
    })
  }

  return (
    <Wrapper>
      <div className="py-5 text-center">
        <h2>Welcome</h2>
        <p className="lead">{user?.first_name} {user?.last_name} has invited you to buy this item(s).</p>
      </div>

      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            {
              products.map((product, index) => {

                return (
                  <li className="list-group-item d-flex justify-content-between lh-condensed" key={index}>
                    <div>
                      <h6 className="my-0">{product.title}</h6>
                      <small className="text-muted">{product.description}</small>
                    </div>
                    <span className="text-muted">${product.price}</span>
                    <div className="text-success">
                      <input type="number" min="0" className='text-muted form-control' placeholder='quantity' style={{ width: '120px' }}
                        defaultValue={quantity(product.id)}
                        onChange={e => change(product.id, parseInt(e.target.value))} />
                    </div>
                  </li>
                )
              })
            }


            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${total()}</strong>
            </li>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={(e) => submitdata(e)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label >First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" required
                  onChange={e => setFirstName(e.target.value)}
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label >Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" required
                  onChange={e => setLastName(e.target.value)}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label >Email <span className="text-muted">(Optional)</span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com"
                onChange={e => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label >Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required
                onChange={e => setAddress(e.target.value)}
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label >Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"
                onChange={e => setAddress2(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label >Country</label>
                <select className="custom-select d-block w-100" id="country" required
                  onChange={e => setCountry(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label >State</label>
                <select className="custom-select d-block w-100" id="state" required
                  onChange={e => setCity(e.target.value)}>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label >Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required
                  onChange={e => setZip(e.target.value)}
                />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">Checkout</button>
          </form>
        </div>
      </div>
    </Wrapper>



  )
}
