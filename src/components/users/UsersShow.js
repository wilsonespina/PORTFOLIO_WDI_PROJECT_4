import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component {
  state = {
    user: {},
    runs: []
  }

  componentWillMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ user: res.data });
        console.log('user res', res.data);
      })
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });

    Axios
      .get('https://www.strava.com/api/v3/athlete', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => {
        this.setState({ runs: res.data });
        console.log('runs res', res.data);
      })
      .catch(err => console.log('this is the error', err));
  }


  render() {

    console.log(this.state);

    return (
      <div className="row">
        <div className="row show-user-profile">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 show-user-avatar">
            <img src={this.state.runs.profile} className="show-user-avatar"/>
          </div>

          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 show-user-info">
            <h1>user info</h1>
          </div>

        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 show-user-runs">
            <h1>RUNS</h1>
          </div>
        </div>

      </div>
    );
  }
}

export default UsersShow;
