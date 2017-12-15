import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

import GoogleMap from '../utility/GoogleMap';
import RunSearch from '../utility/RunSearch';
import Auth from '../../lib/Auth';
import _ from 'lodash';


class UsersShow extends React.Component {
  state = {
    user: {},
    activities: [],
    runs: [],
    shapes: {},
    sortBy: '',
    sortDirection: ''
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  componentWillMount() {

    Axios
      .all([
        Axios
          .get(`/api/users/${this.props.match.params.id}`),
        Axios
          .get('/api/runs', {
            headers: { 'Authorization': `Bearer ${Auth.getStravaToken()}`}
          }),
        Axios
          .get('/api/shapes')
      ])
      .then(Axios.spread((user, runs, res) => {
        const ignoreSlash = runs.data.map(data => {
          data.summary_polyline = String.raw`${data.summary_polyline}`.replace(/\\\\/g, '\\');
          return data;
        });
        const filteredRuns = ignoreSlash.filter(run => {
          if (run.user) {
            return run.user.id === this.props.match.params.id;
          }
        });
        this.setState({ user: user.data, runs: filteredRuns, shapes: res.data });
      }))
      .catch(err => console.log(err));
  }


  handleSort = (e) => {
    const [sortBy, sortDirection] = e.target.value.split('|');
    this.setState({ sortBy, sortDirection});
  }

  render() {
    const { sortBy, sortDirection } = this.state;
    const filterSort = _.orderBy(this.state.runs, [sortBy], [sortDirection]);
    console.log(this.state);
    if (!this.state.runs) return null;

    return (
      <div className="row">
        <div className="container show-user-profile">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 show-user-avatar">
            <img src={this.state.user.image} className="show-user-avatar img-responsive"/>
          </div>

          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <div className="row show-user-info">
              <h1 className="show-title-name">{this.state.user.name}</h1>
              <h3><em>@{this.state.user.username}</em></h3>
              <h3>Total number of runs: <strong>{this.state.runs.length}</strong></h3>

              <div className="show-shape-images">
                <div className="row">
                  <Link to="/shapes"><p className="btn btn-info btn-lg community-btn btn-block"><i className="fa fa-users" aria-hidden="true"></i> View community shapes</p></Link>
                  {' '}
                  <Link to="/users"><p className="btn btn-primary btn-lg strava-btn btn-block"><span className="icon"></span> My Strava runs</p></Link>

                  {/* <Link to="/users"><p className="btn btn-success">My Runs</p></Link> */}
                </div>
              </div>

            </div>

            <div className="show-gmaps-wrapper row">
              <h4>Choose your map style...</h4>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 show-map-option-1">
                <p className="show-map-choices">Black & White</p>
                <img src="../../assets/gmaps1.png" className="gmaps-image img-responsive"/>
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 show-map-option-2">
                <p className="show-map-choices">Normal</p>
                <img src="../../assets/gmaps2.png" className="gmaps-image img-responsive" />
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 show-map-option-3">
                <p className="show-map-choices">Lime</p>
                <img src="../../assets/gmaps3.png" className="gmaps-image img-responsive" />
              </div>
            </div>
          </div>

        </div>

        <hr className="show-horizontal-rule"/>


        <div className="user-show-run-tiles container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 show-user-runs">
              <h1>RUNS</h1>
              <RunSearch
                handleSort={this.handleSort} />


              { filterSort.map(run => {
                return(
                  <div key={run.id} className="show-users-tile col-md-12 col-sm-12 col-xs-12">
                    <div className="show-users-map col-md-8 col-sm-8 col-xs-8 ">
                      <GoogleMap center={{lat: run.start_latlng[0], lng: run.start_latlng[1]}} path={run.summary_polyline} />
                    </div>

                    <div className="show-users-info-tile col-md-4 col-sm-4 col-xs-4 ">
                      {/* <img src={run.shape.image} className="show-shape-on-map" /> */}
                      <p>Ran {moment(run.date).startOf('day').fromNow()}</p>
                      <p>Average community rating: {run.averageRating}</p>
                      <h4 className="show-comment-header">Comments:</h4>
                      { run.comments[0] ? <p>{`"...${run.comments[0].content}..."`}</p> : ' '}
                      { run.comments[0] ? <p><em><strong>@{run.comments[0].createdBy.username}</strong></em></p> : 'No comments posted yet'}
                      <br/>
                      <Link to={`/runs/${run.id}`}><p className="btn btn-info show-view-run-button">View run</p></Link>
                      {/* <img src={run.shape.image} className="show-shape-on-map" /> */}

                    </div>
                    <img src={run.shape.image} className="show-shape-on-map" />

                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersShow;
