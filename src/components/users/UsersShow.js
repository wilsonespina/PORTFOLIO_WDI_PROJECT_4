import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component {
  state = {
    user: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }


  render() {

    console.log(this.state.user)
    return (
      <div className="row">
        <div className="col-md-6">
          <h1>my show page</h1>
        </div>
      </div>
    );
  }
}

export default UsersShow;
