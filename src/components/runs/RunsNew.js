import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import GoogleMap from '../utility/GoogleMap';

class RunsNew extends React.Component {
  state = {
    run: {}

  };

  // handleChange = ({ target: { name, value } }) => {
  //   const run = Object.assign({}, this.state.run, { [name]: value });
  //   this.setState({ run });
  // }

  componentDidMount() {
    Axios
      .get('https://www.strava.com/api/v3/athlete/activities', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => {
        res.data = res.data.map(data => {
          data.map.summary_polyline = String.raw`${data.map.summary_polyline}`.replace(/\\\\/g, '\\');
          return data;
        });
        this.setState({ runs: res.data });
        console.log('res.data', res);
      })
      .catch(err => console.log('this is the error', err));

  }


  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/runs/${this.props.match.params.id}`, this.state.run, {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(() => this.props.history.push(`/runs/${this.state.run.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form>


        <button>Submit Run!</button>
      </form>

    );
  }
}

export default RunsNew;
