import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Footer = ({ history }) => {

  if (history.location.pathname === '/login') return null;

  return(
    <div className="footer-footer">
    </div>
  );
};

export default withRouter(Footer);
