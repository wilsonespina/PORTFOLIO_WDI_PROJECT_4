import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

class UsersShow extends React.Component {
  state = {
    user: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/runs/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  deleteUser = () => {
    Axios
      .delete(`/api/runs/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h3>{this.state.user.username}</h3>
          <h4>{this.state.user.email}</h4>
          {/* <BackButton history={this.props.history} /> */}
          {Auth.isAuthenticated() && <Link to={`/runs/${this.state.user.id}/edit`} className="standard-button">
            <i className="fa fa-pencil" aria-hidden="true"></i>Edit
          </Link>}
          {' '}
          {Auth.isAuthenticated() && <button className="main-button" onClick={this.deleteUser}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>}
        </div>
      </div>
    );
  }
}

export default UsersShow;
