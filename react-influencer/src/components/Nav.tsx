import { PropsWithRef, useEffect } from "react";

import { Link } from "react-router-dom";
import { User } from "../classes/user";
import { connect } from "react-redux";
import setUser from "../redux/actions/setUserAction";

function Nav(props: PropsWithRef<any>) {

  const handleLogout = () => {
    localStorage.clear()
    props.setUser(new User(0, '', '', '', 0))
  }

  let menu = <Link to={"/login"} className="btn btn-outline-primary">Login</Link>;

  if (localStorage.getItem("tokeninfluencer")) {
    menu = (
      <>
        <nav className="my-2 my-md-0 mr-md-3">
          <button onClick={handleLogout} type="button" className="btn btn-link">logout</button>
          <Link to={"/rankings"} className="btn btn-link">rankings</Link>
          <Link to={"/stats"} className="btn btn-link">Stats</Link>
        </nav>
        <Link to={"/profile"} className="btn btn-outline-primary">{props.user.first_name}</Link>
      </>
    )
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm">
      <Link to={"/"} className="navbar-brand my-0 mr-md-auto font-weight-normal">Influencer</Link>
      {menu}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
