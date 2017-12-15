import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

// import BackButton from '../utility/BackButton';
import SearchBar from '../utility/SearchBar';
import GoogleMap from '../utility/GoogleMap';
import Auth from '../../lib/Auth';

class ShapesShow extends React.Component {
  state = {
    shape: null,
    runs: [],
    averageRating: '',
    sortBy: '',
    sortDirection: '',
    query: ''
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }


  componentWillMount() {
    Axios
      .all([
        Axios
          .get(`/api/shapes/${this.props.match.params.id}`),
        Axios
          .get('/api/runs', {
            headers: { 'Authorization': `Bearer ${Auth.getStravaToken()}`}
          })
      ])
      .then(Axios.spread((shape, runs) => {
        const ignoreSlash = runs.data.map(data => {
          data.summary_polyline = String.raw`${data.summary_polyline}`.replace(/\\\\/g, '\\');
          return data;
        });
        const filteredRuns = ignoreSlash.filter(run => {
          if (run.shape) {
            return run.shape.id === this.props.match.params.id;
          }
        });
        this.setState({ shape: shape.data, runs: filteredRuns });
      }))
      .catch(err => console.log(err));
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  }

  handleSort = (e) => {
    const [sortBy, sortDirection] = e.target.value.split('|');
    this.setState({ sortBy, sortDirection});
  }

  render() {
    const { sortBy, sortDirection, query } = this.state;
    const regex = new RegExp(query, 'i');
    const filterSort = _.orderBy(this.state.runs, [sortBy], [sortDirection]);
    const sorted = _.filter(filterSort, (run) => regex.test([run.user.username]));

    if (!this.state.shape) return null;
    // console.log(this.state.runs);
    console.log('sorted', sorted);

    return (
      <div className="row">

        <div className="shape-show-background">
        </div>


        <div className="container shape-show-top-container">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 show-top-section">
            <img src={this.state.shape.image} className="show-main-image img-responsive" />
          </div>

          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">

            <div className="show-gmaps-wrapper row">
              <h1 className="show-shape-name-label ">{this.state.shape.name}</h1>
              { this.state.shape && <h3>Number of community runs: {filterSort.length}</h3>}
            </div>

          </div>

        </div>

        <hr/>
        <div className="container">

          <div className="row show-bottom-section">
            <h1>Runs</h1>
            <SearchBar
              handleSort={this.handleSort}
              handleSearch={this.handleSearch} />
            <Link to="/users"><p className="btn btn-primary strava-btn btn-lg"><span className="icon"></span> My Strava runs</p></Link>
            {' '}
            <Link to={`/shapes/${this.state.shape.id}/submit`}><p className="btn btn-primary btn-lg"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add my own run</p></Link>

            { sorted.map(run => {
              return(
                <div key={run.id} className="col-md-10 col-sm-10 col-xs-12 shape-show-tiles">
                  {/* <Link to={`/runs/${run.id}`}><h2>{run.shape.name}</h2></Link> */}
                  <p>Rating: {run.averageRating}</p>
                  <p>Runner: {run.user.username}</p>
                  <p>Run Date: {moment(run.date).startOf('day').fromNow()}</p>
                  <p>Start Time: {(run.date).substring(11, 16)}</p>
                  <Link to={`/runs/${run.id}`} className="btn btn-info view-info-button"><p><i className="fa fa-eye" aria-hidden="true"></i> View run</p></Link>
                  {run.start_latlng ? <GoogleMap center={{lat: run.start_latlng[0], lng: run.start_latlng[1]}} path={run.summary_polyline} className="shapes-show-google"/> : <img src="../../assets/Spinner.gif" />}
                </div>
              );
            })}

          </div>



        </div>
      </div>
    );
  }
}

export default ShapesShow;
