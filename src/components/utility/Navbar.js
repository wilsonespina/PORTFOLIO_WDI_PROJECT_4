import React from 'react';
import Auth from '../../lib/Auth';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ history }) => {

  const iconStyle = 'https://s3-eu-west-1.amazonaws.com/wdi-30-ldn/wdi-project-4/footpath-logo.png';

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    history.push('/login');
  };

  const currentUser = Auth.getPayload();

  if (history.location.pathname === '/login') return null;

  return(
    <div className="navall">

      <div className="nav-top">
      </div>

      <div className="nav-middle">
        <Link to="/shapes"><i className="fa fa-th-large nav-tile-icon" aria-hidden="true"></i></Link>
        { currentUser ? <Link to={`/users/${currentUser.userId}`} className="header-link"><h1 className="nav-trace">TRACE <img src={iconStyle} className="foot-icon" /></h1></Link> : null}

        {Auth.isAuthenticated() && <a href="#" onClick={logout} className="nav-logout-button">Logout</a>}

      </div>

      <div className="nav-bottom">
      </div>

    </div>

  );
};

export default withRouter(Navbar);
