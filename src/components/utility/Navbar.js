import React from 'react';
import Auth from '../../lib/Auth';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ history }) => {

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    history.push('/login');
  };

  const currentUser = Auth.getPayload();
  return(

    <nav className="navbar row">
      <div className="nav-top col-12">

      </div>

      <div className="nav-middle col-12">
        <Link to="/shapes"><i className="fa fa-th-large nav-tile-icon" aria-hidden="true"></i></Link>
        {/* {!Auth.isAuthenticated() && <Link to="/login" className="standard-button">Login</Link>} */}
        {' '}
        <Link to={`/users/${currentUser.userId}`}><h1 className="nav-trace">TRACE <img src="../../Readme_Files/images/footpath-logo.png" className="foot-icon" /></h1></Link>

        {Auth.isAuthenticated() && <a href="#" onClick={logout} className="nav-logout-button">Logout</a>}

      </div>

      <div className="nav-bottom col-12">
      </div>


    </nav>
  );
};

export default withRouter(Navbar);
