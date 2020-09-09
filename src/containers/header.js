import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

class Header extends Component {
  handleLogout = () => {};
  render() {
    return (
      <>
        {this.props.user.username ? (
          <nav className="nav-wrapper grey darken-3">
            <div id="logo" className="container left">
                <Link to="/login" className="brand-logo">
                  Notes
                </Link>
            </div>
            <div className="container">
              <ul className="right">
                <li><NavLink to="/notes">My Notes</NavLink></li>
                <li><NavLink to="/notes/new">New Note</NavLink></li>
                <li><NavLink to="/login" onClick={this.props.logout} >Log Out</NavLink></li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav className="nav-wrapper grey darken-3">
            <div id="logo" className="container left">
                <Link to="/login" className="brand-logo">
                  Notes
                </Link>
            </div>
            <div className="container">
              <ul className="right">
                <li><NavLink to="/SignUp">SignUp</NavLink></li>
              </ul>
            </div>
          </nav>
        )}
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
