import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

class ShapesIndex extends React.Component {
  state = {
    shapes: []
  }

  componentWillMount() {
    Axios
      .get('/api/shapes', {
        headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
      })
      .then(res => this.setState({ shapes: res.data }))
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div className="row">
        <div className="main-section col-lg-12">
          <h1>Community Shapes</h1>

          { this.state.shapes.map(shape => {
            return(
              <div key={shape.id} className="show-image-tile col-md-12">

                <div className="left-tile col-md-6">
                  {shape.image &&
                    <img src={shape.image} className="shapes-index-img"/>}
                </div>
                <div className="right-tile col-md-6">
                  <Link to={`/shapes/${shape.id}`}>
                    <h1 className="show-shape-name">{shape.name}</h1>
                  </Link>
                  <p>Number of attempted runs in the past:.......</p>
                  <p>People who have attempted this run:.......</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ShapesIndex;
