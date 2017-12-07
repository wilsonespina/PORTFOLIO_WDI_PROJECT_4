import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';
import GoogleMap from '../utility/GoogleMap';

class RunsIndex extends React.Component {
  state = {
    runs: [],
    center: { lat: 52.3755, lng: -2.317 },
    search: ''
  }

  componentWillMount() {
    Axios
      .get('/api/runs', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => this.setState({ runs: res.data }))
      .catch(err => console.log(err));
  }

  // handleSearch = (e) => {
  //   this.setState({ search: e.target.value });
  //   console.log(this.state.search);
  // }

  render() {

    // const { search } = this.state;
    // const regex = new RegExp(search, 'i');
    // const filterSort = _.orderBy(this.state.runs);
    // const sorted = _.filter(filterSort, (run) => regex.test([run.breed]));
console.log(this.state.runs);

    return (
      <div>
        <div className="row">
          <h1>Community Runs</h1>
          <h2>Shape of the week</h2>
          { this.state.runs[0] && <img src={this.state.runs[0].shape.image} className="run-index-shape-of-week"/>}

        </div>

        <div className="row">
          { this.state.runs.map(run => {
            return(
              <div key={run.id} className="image-tile col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <Link to={`/runs/${run.id}`}>
                  <h1>{run.user.username}</h1>
                </Link>
                <p><strong>Start Date: {(run.date).substring(0, 10)}</strong></p>
                <p><strong>Start Time: {(run.date).substring(11, 16)}</strong></p>
                <p>Shape: {run.shape.name}</p>
                {run.shape.image && <img src={run.shape.image} className="run-index-img-tile"/>}
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
