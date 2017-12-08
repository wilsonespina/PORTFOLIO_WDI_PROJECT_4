import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

// import BackButton from '../utility/BackButton';
// import Auth from '../../lib/Auth';

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
  }

  deleteUser = () => {
    Axios
      .delete(`/api/shapes/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'));
  }

  render() {

    console.log(this.state.shape);

    return (
      <div className="row">
        <div className="row show-top-section">
          <div className="col-md-6">
            <h3>{this.state.shape.name}</h3>
            <img src={this.state.shape.image} className="show-main-image" />
          </div>
        </div>

        <div className="row show-bottom-section">
          <h1>Runs</h1>
          <button>Add a run</button>





        </div>
      </div>
    );
  }
}

export default ShapesShow;
