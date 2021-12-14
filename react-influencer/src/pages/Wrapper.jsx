import React, { PropsWithChildren, useEffect } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { User } from "../classes/user";
import axios from "axios";
import { connect } from "react-redux";
import setUser from "../redux/actions/setUserAction";

function Wrapper(props: PropsWithChildren<any>) {
  const tokeninfluencer = localStorage.getItem('tokeninfluencer');
  useEffect(() => {
    if (tokeninfluencer) {

      (async () => {
        const response = await axios.get('user');
        const user: User = response.data.data;

        props.setUser(new User(
          user.id,
          user.first_name,
          user.last_name,
          user.email,
          user.revenue
        ));
      })
        ()
    }

  }, [])


  return (
    <>
      <Nav />


      <div className="album py-5 bg-light">
        <div className="container">
          {props.children}
        </div>
      </div>

      <Footer />
    </>
  )
}

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: User) => dispatch(setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);