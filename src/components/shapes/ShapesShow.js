import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// import BackButton from '../utility/BackButton';
import GoogleMap from '../utility/GoogleMap';
import Auth from '../../lib/Auth';

class ShapesShow extends React.Component {
  state = {
    shape: null,
    runs: []
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

  deleteUser = () => {
    Axios
      .delete(`/api/shapes/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'));
  }

  render() {
    if (!this.state.shape) return null;
    return (
      <div className="row">
        <div className="container">
          <div className="row show-top-section">
            <div className="col-md-6">
              <h3>{this.state.shape.name}</h3>
              <img src={this.state.shape.image} className="show-main-image" />
            </div>
          </div>

          <hr/>
          <div className="row show-bottom-section">
            <h1>Runs</h1>
            <Link to="/users"><button>My Runs</button></Link>
            <Link to={`/shapes/${this.state.shape.id}/submit`}><button>Add my own run</button></Link>

            { this.state.runs.slice(0).reverse().map(run => {
              return(
                <div key={run.id} className="col-md-10 col-sm-10 col-xs-12">
                  <Link to={`/runs/${run.id}`}><h2>{run.shape.name}</h2></Link>
                  <p>Rating: {run.rating}</p>
                  <p>Runner: {run.user.username}</p>
                  <p>Start Time: {(run.date).substring(11, 16)}</p>
                  <p>Start Date: {(run.date).substring(0, 10)}</p>
                  {run.start_latlng && <GoogleMap center={{lat: run.start_latlng[0], lng: run.start_latlng[1]}} path={run.summary_polyline} />}
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
