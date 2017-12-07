import React from 'react';
import OAuth from '../../lib/OAuth';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import axios from 'axios';


class OAuthButton extends React.Component {

  componentWillMount() {
    this.provider = OAuth.getProvider(this.props.provider);

    if(!location.search.match(/code/) || localStorage.getItem('provider') !== this.provider.name) return false;

    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;

    axios.post(this.provider.url, data)
      .then(res => {
        Auth.setToken(res.data.token);
        Auth.setStravaToken(res.data.access_token);
      })
      .then(() => localStorage.removeItem('provider'))
      .then(() => this.props.history.replace(this.props.location.pathname))
      .then(() => this.props.history.push('/'));
  }

  setProvider = () => {
    localStorage.setItem('provider', this.props.provider);
  }

  render(){
    const provider = OAuth.getProvider(this.props.provider);

    return (
      <a
        className="btn btn-primary"
        href={provider.authLink}
        onClick={this.setProvider}
      >
        {this.props.children}
      </a>
    );
  }
}

export default withRouter(OAuthButton);
