import React from 'react';
import Axios from 'axios';
import moment from 'moment';

import Auth from '../../lib/Auth';
import GoogleMap from '../utility/GoogleMap';

class ShapesSubmit extends React.Component {
  state = {
    runs: [],
    run: {},
    shape: {}
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    ///////----------*****update*********

    // Axios
    //   .all([
    //     Axios
    //       .get(`/api/shapes/${this.props.match.params.id}`),
    //     Axios
    //       .get('https://www.strava.com/api/v3/athlete/activities', {
    //         headers: { 'Authorization': `Bearer ${Auth.getStravaToken()}`}
    //       })
    //   ])
    //   .then(Axios.spread((shape, runs) => {

    Axios
      .get(`/api/shapes/${this.props.match.params.id}`)
      .then(res => this.setState({ shape: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });

    Axios
      .get('https://www.strava.com/api/v3/athlete/activities', {
        headers: { 'Authorization': `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => {
        res.data = res.data.map(data => {
          data.map.summary_polyline = String.raw`${data.map.summary_polyline}`.replace(/\\\\/g, '\\');
          return data;
        });
        const runs = res.data.filter(run => run.type === 'Run');
        this.setState({ runs: runs });
      })
      .catch(err => console.log('this is the error', err));
  }

  handleChange(target) {
    const selectedRun = { date: target.start_date, shape: this.props.match.params.id, start_latlng: target.start_latlng, summary_polyline: target.map.summary_polyline  };
    this.setState({ run: selectedRun });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/runs', this.state.run, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push(`/shapes/${this.props.match.params.id}`))
      .catch(err => console.log(err));
  }

  render() {
    console.log();
    return (
      <div className="row">
        <div className="container">
          <div className="shape-submit-left col-md-6 col-sm-6 col-xs-12">
            {this.state.shape.image && <img src={this.state.shape.image} className="shapes-submit-shape-img"/>}
          </div>


          <div className="shape-submit-right col-md-6 col-sm-6 col-xs-12">
            <h1>Choose a run to submit...</h1>

            <form onSubmit={this.handleSubmit}>

              {this.state.runs.map && <div className="show-tile-images">
                { this.state.runs.map(run => {
                  return(
                    <div key={run.id} className="image-tile col-md-12 col-sm-12 col-xs-12 radio">
                      <button className="btn btn-info">Submit Run!</button>

                      <label className="user-submit-label col-lg-12 col-md-12">
                        <input
                          type="radio"
                          name="map"
                          onClick={() => this.handleChange(run)}
                        />
                        <p className="run-date-p">Run date: {moment(run.start_date_local).startOf('day').fromNow()}</p>

                        {/* {run.summary_polyline ? <GoogleMap center={{lat: run.start_latlng[0], lng: run.start_latlng[1]}} path={run.summary_polyline} /> : <img src="../../assets/Spinner.gif" />} */}

                        <GoogleMap center={{lat: run.start_latlng[0], lng: run.start_latlng[1]}} path={run.map.summary_polyline} />
                      </label>


                    </div>
                  );
                })}
              </div>}
            </form>
          </div>

        </div>
      </div>

    );
  }
}

export default ShapesSubmit;
