import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class UsersIndex extends React.Component {
  state = {
    users: [],
    search: ''
  }

  componentWillMount() {
    Axios
      .get('/api/users', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  render() {

    console.log(this.state.users);
    return (
      <div>
        <div className="row">
          {/* <div className="col-md-12">
            <SearchBar handleSearch={ this.handleSearch } />
            <Link to="/users/new" className="btn btn-info index-add-button">
              <i className="fa fa-plus" aria-hidden="true"></i>Add a Run
            </Link>
          </div> */}

          { this.state.users.map(user => {
            return(
              <div key={user.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/users/${user.id}`}>
                  <h1>{user.username}</h1>
                </Link>
                <p><strong>{user.email}</strong></p>
              </div>
            );
          })}

        </div>
      </div>
    );
  }
}

export default UsersIndex;
