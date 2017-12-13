import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import GoogleMap from '../utility/GoogleMap';
import Auth from '../../lib/Auth';
// import _ from 'lodash';

// import SearchBar from '../utility/SearchBar';
class UsersIndex extends React.Component {
  state = {
    runs: [],
    search: ''
  }

  componentWillMount() {
    Axios
      .get('https://www.strava.com/api/v3/athlete/activities', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => {
        res.data = res.data.map(data => {
          data.map.summary_polyline = String.raw`${data.map.summary_polyline}`.replace(/\\\\/g, '\\');
          return data;
        });
        const runs = res.data.filter(run => run.type === 'Run');
        this.setState({ runs: runs });
        console.log('runs data', runs);
      })
      .catch(err => console.log('this is the error', err));

  }




  render() {
    // console.log(this.state.runs);
    const currentUser = Auth.getPayload();
    console.log(currentUser);

    return (
      <div>
        <div className="row">


          { this.state.runs.map(run => {
            return(
              <div key={run.id} className="image-tile col-md-6 col-sm-6 col-xs-12">
                <Link to={`/users/${currentUser.userId}`}>
                  <h1>Current USER::{run.athlete.id}</h1>
                </Link>
                <p>Distance: {run.distance}m</p>
                <p>Start Date: {(run.start_date_local).substring(0, 10)}</p>
                <p>Start Time: {(run.start_date_local).substring(11, 16)}</p>
                {run.start_latlng && <GoogleMap center={{lat: run.start_latlng[0], lng: run.start_latlng[1]}} path={run.map.summary_polyline} />}
                <Link to={`/runs/${run.id}/new`}><p>Submit run</p></Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UsersIndex;
