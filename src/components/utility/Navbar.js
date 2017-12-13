import React from 'react';
import Auth from '../../lib/Auth';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ history }) => {

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    history.push('/login');
  };

  return(
    <nav className="navbar">
      <div className="nav-top col-12">

      </div>

      <div className="nav-middle col-12">
        <i className="fa fa-th-large nav-tile-icon" aria-hidden="true"></i>
        <img src="../../Readme_Files/images/footpath-logo.png" className="foot-icon"/>
        {!Auth.isAuthenticated() && <Link to="/login" className="standard-button">Login</Link>}
        {' '}
        <h1 className="nav-trace">TRACE</h1>
        {Auth.isAuthenticated() && <a href="#" onClick={logout} className="nav-logout-button">Logout</a>}

      </div>

      <div className="nav-bottom col-12">
      </div>


    </nav>
  );
};

export default withRouter(Navbar);
