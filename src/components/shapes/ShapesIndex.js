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
        <div className="shape-index-background">


        </div>

        <div className="container">
          <h1>COMMUNITY SHAPES</h1>
          { this.state.shapes.map(shape => {
            return(
              <div key={shape.id} className="shape-index-tile col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h2 className="show-shape-name">{shape.name} run</h2>
                <Link to={`/shapes/${shape.id}`}>
                  {shape.image &&
                    <img src={shape.image} className="shapes-index-img img-responsive"/>}
                </Link>
                <p>Number of attempted runs in the past:.......</p>
                <p>People who have attempted this run:.......</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ShapesIndex;
