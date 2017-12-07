import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
// import _ from 'lodash';

// import SearchBar from '../utility/SearchBar';

class RunsIndex extends React.Component {
  state = {
    runs: [],
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
          {/* <div className="col-md-12">
            <SearchBar handleSearch={ this.handleSearch } />
            <Link to="/runs/new" className="btn btn-info index-add-button">
              <i className="fa fa-plus" aria-hidden="true"></i>Add a Run
            </Link>
          </div> */}

          { this.state.runs.map(run => {
            return(
              <div key={run.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/runs/${run.id}`}>
                  <h1>{run.user.username}</h1>
                </Link>
                <p><strong>{run.date}</strong></p>
                <p>Shape: {run.shape.name}</p>
                {run.shape.image && <img src={run.shape.image} />}
              </div>
            );
          })}

        </div>
      </div>
    );
  }
}

export default RunsIndex;
