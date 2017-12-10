import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// import BackButton from '../utility/BackButton';
import GoogleMap from '../utility/GoogleMap';
import Auth from '../../lib/Auth';

class ShapesShow extends React.Component {
  state = {
    shape: {},
    runs: []
  }

  componentWillMount() {
    Axios
      .get(`/api/shapes/${this.props.match.params.id}`)
      .then(res => this.setState({ shape: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });

    Axios
      .get('/api/runs', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => {
        res.data = res.data.map(data => {
          data.summary_polyline = String.raw`${data.summary_polyline}`.replace(/\\\\/g, '\\');
          return data;
        });
        const runs = res.data.filter(run => run.shape.id === this.props.match.params.id);

        this.setState({ runs: runs });
        console.log('res data', runs);
      })
      .catch(err => console.log(err));

      // Axios
      //   .get('https://www.strava.com/api/v3/athlete/activities', {
      //     headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      //   })
      //   .then(res => {
      //     res.data = res.data.map(data => {
      //       data.map.summary_polyline = String.raw`${data.map.summary_polyline}`.replace(/\\\\/g, '\\');
      //       return data;
      //     });
      //     this.setState({ runs: res.data });
      //   })
      //   .catch(err => console.log('this is the error', err));




  }

  deleteUser = () => {
    Axios
      .delete(`/api/shapes/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'));
  }

  render() {
    // console.log(this.state.runs);
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
            <Link to="/users"><button>Add a run</button></Link>

            { this.state.runs.map(run => {
              return(
                <div key={run.id} className="col-md-10 col-sm-10 col-xs-12">
                  <p>{run.shape.name}</p>
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
