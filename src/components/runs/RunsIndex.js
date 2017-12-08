import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import GoogleMap from '../utility/GoogleMap';
import Auth from '../../lib/Auth';
// import _ from 'lodash';

// import SearchBar from '../utility/SearchBar';

class RunsIndex extends React.Component {
  state = {
    runs: [],
    center: { lat: 52.3755, lng: -2.317 },
    search: ''
  }

  componentWillMount() {
    Axios
      .get('https://www.strava.com/api/v3/athlete/activities', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => this.setState({ runs: res.data }))
      .catch(err => console.log('this is the error', err));
  }

  render() {

    console.log(this.state.runs);
    return (
      <div>
        <div className="row">
          {/* <div className="col-md-12">
            <SearchBar handleSearch={ this.handleSearch } />
            <Link to="/runs/new" className="btn btn-info index-add-button">
              <i className="fa fa-plus" aria-hidden="true"></i>Add a Run
            </Link>
          </div> */}

          { this.state.runs.map(run => {
            return(
              <div key={run.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/runs/${run.id}`}>
                  <h1>{run.athlete.id}</h1>
                </Link>
                <p>Distance: {run.distance}m</p>
                <p>Start Date: {(run.start_date_local).substring(0, 10)}</p>
                <p>Start Time: {(run.start_date_local).substring(11, 16)}</p>
                <GoogleMap center={this.state.center} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RunsIndex;
