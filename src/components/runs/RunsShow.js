import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import GoogleMap from '../utility/GoogleMap';
// import Auth from '../../lib/Auth';

class RunsShow extends React.Component {
  state = {
    shape: {},
    run: {
      comments: []
    }
  }

  componentWillMount() {
    Axios
      .get(`/api/runs/${this.props.match.params.id}`)
      .then(res => this.setState({ run: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  handleChange = ({ target: { name, value }}) => {
    const run = Object.assign({}, this.state.run, { [name]: value });
    this.setState({ run: run });
    console.log('change', this.state.run);
  }

  addComment = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/runs/${this.props.match.params.id}/comments`, this.state.run.comments[0], {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(this.setState({ run: this.state.run }))
      .catch(err => console.log(err));
    console.log('submit', this.state.run);
  }

  // deleteComment() {
  //
  // }

  render() {
    // console.log(this.state.run);
    return (
      <div className="row">
        <div className="container">
          <div className="col-md-6 runs-show-left">
            { this.state.run.summary_polyline && <div>
              <h3>{this.state.run.shape.name}</h3>,
              <img src={this.state.run.shape.image} className="runs-show-shape-img"/>,
              <GoogleMap center={{lat: this.state.run.start_latlng[0], lng: this.state.run.start_latlng[1]}} path={this.state.run.summary_polyline} />,
              <h3>Average rating: {this.state.run.rating}</h3>
            </div>}
          </div>

          <div className="col-md-6 runs-show-right">
            <div className="run-show-info-box">
              { this.state.run.user && <div>
                <h2>{this.state.run.user.username}</h2>,
              </div>}
              <h3>RATING:</h3>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 run-show-comments-box">
              <h3>Comments</h3>
              { this.state.run.comments && <div>
                { this.state.run.comments.map(comment => {
                  return(
                    <div key={comment.id} className="run-show-comment-individual">
                      <p>{comment.content}</p>
                      <p><strong>@{comment.createdBy.username}</strong></p>
                    </div>
                  );
                })}
              </div>}

              <form className="input-form" onSubmit={this.addComment}>
                <div className="run-show-comment-form">
                  <label className="comment-label">Comment</label>
                  <input
                    type="text"
                    className="form-control"
                    name="content"
                    id="comment-box"
                    onChange={this.handleChange}
                  />
                  <button className="btn">POST</button>
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default RunsShow;
