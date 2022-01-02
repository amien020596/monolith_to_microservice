import { PropsWithRef, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { User } from "../classes/user"
import { connect } from "react-redux"
import setUser from "../redux/actions/setUserAction"

function Header(props: PropsWithRef<any>) {
  const [title, settitle] = useState('Welcome');
  const [description, setdescription] = useState('Share link and earn 10% of the product price!');

  useEffect(() => {
    if (props.user?.id !== 0) {
      settitle("$" + props.user.revenue)
      setdescription('total amount you have earned')
    } else {
      settitle('Welcome')
      setdescription('Share link and earn 10% of the product price!')
    }
  }, [props])

  let buttons;

  if (props.user?.id !== 0) {
    buttons = (
      <p>
        <Link to={'/stats'} className="btn btn-secondary my-2">Stats</Link>
      </p>
    )
  } else {
    buttons = (
      <p>
        <Link to={"/login"} className="btn btn-primary my-2">Login</Link>
        <Link to={"/register"} className="btn btn-secondary my-2">Register</Link>
      </p>
    )
  }

  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">{title}</h1>
        <p className="lead text-muted">{description}</p>
        {buttons}
      </div>
    </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);