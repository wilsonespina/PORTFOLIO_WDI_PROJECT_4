import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

class ShapesIndex extends React.Component {
  state = {
    shapes: [],
    runs: {}
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    Axios
      .all([
        Axios
          .get('/api/runs', {
            headers: { 'Authorization': `Bearer ${Auth.getStravaToken()}`}
          }),
        Axios
          .get('/api/shapes', {
            headers: { 'Authorization': `Bearer ${Auth.getStravaToken()}`}
          })
      ])
      .then(Axios.spread((runs, shapes) => {
        this.setState({ runs: runs.data, shapes: shapes.data });
      }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);

    // const fileteredShape = this.state.runs.filter(run => run.shape.name === this.state.shapes.name);

    // console.log(fileteredShape);

    // const filteredRuns = ignoreSlash.filter(run => {
    //   if (run.shape) {
    //     return run.shape.id === this.props.match.params.id;
    //   }
    // });




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
                <h3>Number of attempted runs: { shape.runs && shape.runs.length }</h3>
                <p>People who have attempted this run:.......</p>
                <Link to={`/shapes/${shape.id}`}><p className="btn btn-info btn-lg btn-block"><i className="fa fa-eye" aria-hidden="true"></i> View community runs</p></Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ShapesIndex;
