import React from 'react';
import OAuth from '../../lib/OAuth';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import axios from 'axios';


class OAuthButton extends React.Component {

  componentWillMount() {

    // const currentUser = Auth.getPayload();
    // console.log(currentUser);

    this.provider = OAuth.getProvider(this.props.provider);

    if(!location.search.match(/code/) || localStorage.getItem('provider') !== this.provider.name) return false;

    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;

    axios
      .post(this.provider.url, data)
      .then(res => {
        Auth.setToken(res.data.token);
        Auth.setStravaToken(res.data.access_token);

        localStorage.removeItem('provider');
        this.props.history.replace(this.props.location.pathname);
        console.log(res);
        return res.data.payload;
      })
      .then(payload => this.props.history.push(`/users/${payload.userId}`))
      .catch(err => console.log(err));
      // .then(() => localStorage.removeItem('provider'))
      // .then(() => this.props.history.replace(this.props.location.pathname))
    // console.log('user after', currentUser)
      // .then(() => this.props.history.push('/shapes'));
      // .then(() => this.props.history.push(`/users/${currentUser.userId}`));

    //
    // axios.post(this.provider.url, data)
    //   .then(() => this.props.history.push(`/users/${currentUser.userId}`));


  }


  setProvider = () => {
    localStorage.setItem('provider', this.props.provider);
  }

  render(){
    const provider = OAuth.getProvider(this.props.provider);
    const currentUser = Auth.getPayload();

    return (
      // <Link to={`/users/${currentUser.userId}`}>
      <a
        className="btn btn-primary strava-login-button"
        id="login-button"
        href={provider.authLink}
        onClick={this.setProvider}
      >
        {this.props.children}
      </a>
    );
  }
}

export default withRouter(OAuthButton);
