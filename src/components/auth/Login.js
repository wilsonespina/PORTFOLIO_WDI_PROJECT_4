import React from 'react';
import OAuthButton from './OAuthButton';

// import css from '../../scss/components/login.scss';

class Login extends React.Component {

  render() {
    return (
      <div className="login-all">

        <div className="col-xs-0 col-sm-0 col-md-6 col-lg-6 login-left">
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 login-right">

          <div className="button-wrapper">
            <h1 className="nav-trace-login">TRACE <img src="../../Readme_Files/images/footpath-logo.png" className="foot-icon-login" /></h1>
            <OAuthButton provider="strava"><p><span className="icon"></span> Login with Strava</p></OAuthButton>
            <br/>
            <a
              className="btn btn-primary"
              id="login-button"
              href="https://www.strava.com/register/free"
              target="blank"
            >Register for Strava account
            </a>
          </div>


        </div>
      </div>
    );
  }
}

export default Login;
