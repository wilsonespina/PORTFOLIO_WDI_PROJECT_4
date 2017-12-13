import React from 'react';
import Auth from '../../lib/Auth';
import { Link, withRouter } from 'react-router-dom';
import BackButton from './BackButton';

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

      </div>
      <div className="nav-bottom col-12">
        {!Auth.isAuthenticated() && <Link to="/login" className="standard-button">Login</Link>}
        {' '}
        {Auth.isAuthenticated() && <a href="#" onClick={logout} className="standard-button">Logout</a>}
        {Auth.isAuthenticated() && <BackButton />}

      </div>


    </nav>
  );
};

export default withRouter(Navbar);
