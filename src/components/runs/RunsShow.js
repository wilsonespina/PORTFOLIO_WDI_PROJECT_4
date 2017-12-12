import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ReactStars from 'react-stars';


import Auth from '../../lib/Auth';
import GoogleMap from '../utility/GoogleMap';
// import Auth from '../../lib/Auth';

class RunsShow extends React.Component {
  state = {
    shape: {},
    run: {
      comments: [],
      rating: [0]
    },
    comment: {
      content: ''
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

  handleChange = ({ target: { name, value } }) => {
    this.setState({ comment: {[name]: value} });
  }

  submitComment = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/runs/${this.props.match.params.id}/comments`, this.state.comment, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        const run = Object.assign({}, this.state.run, { comments: res.data.comments });
        this.setState({ run, comment: { content: '' } });
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  deleteComment = (commentId) => {
    Axios
      .delete(`/api/runs/${this.props.match.params.id}/comments/${commentId}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        const comments = this.state.run.comments.filter(comment => comment.id !== commentId);
        const run = Object.assign({}, this.state.run, { comments: comments });
        this.setState({ run: run });

      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  deleteRun = () => {
    Axios
      .delete(`/api/runs/${this.props.match.params.id}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push(`/shapes/${this.state.run.shape.id}`))
      .catch(err => console.log(err));
  }

  saveRating = (newRating) => {
    const newArray = this.state.run.rating.push(newRating);
    // console.log(newArray);
    const run = Object.assign({}, this.state.run, { rating: this.state.run.rating });
    // console.log(this.state.run);

    Axios
      .put(`/api/runs/${this.props.match.params.id}`,  { run }, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        this.setState({ run: run });
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    const sum = this.state.run.rating.reduce((total, amount) => total + amount);
    const averageRating = parseFloat(Number(sum / this.state.run.rating.length).toFixed(1));
    console.log(this.state.run.rating);
    
    return (
      <div className="row">
        <div className="container">
          <div className="col-md-6 runs-show-left">
            { this.state.run.summary_polyline && <div>
              <h3>{this.state.run.shape.name}</h3>,
              <img src={this.state.run.shape.image} className="runs-show-shape-img"/>,
              <GoogleMap center={{lat: this.state.run.start_latlng[0], lng: this.state.run.start_latlng[1]}} path={this.state.run.summary_polyline} />,
            </div>}
          </div>

          <div className="col-md-6 runs-show-right">
            <div className="run-show-info-box">
              { this.state.run.user && <div>
                <h2>Run by: {this.state.run.user.username}</h2>
                <p>Average rating: {this.state.run.rating.length > 0 ? averageRating : 'TBC'}</p>,
              </div>}
              <button className="btn btn-danger" onClick={this.deleteRun}>DELETE RUN</button>
              <h3>YOUR RATING:</h3>

              <form>

                <ReactStars
                  count={5}
                  onChange={this.saveRating}
                  size={50}
                  color2={'#E76200'}
                  onClick= {() => this.saveRating()} />
              </form>


            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 run-show-comments-box">
              <h3>Comments</h3>
              { this.state.run.comments && <div>
                { this.state.run.comments.map(comment => {
                  return(
                    <div key={comment.id} className="run-show-comment-individual">
                      <p>{comment.content}</p>
                      <p><strong>@{comment.createdBy.username}</strong></p>
                      <button className="btn-danger" onClick={() => this.deleteComment(comment.id)}>delete</button>
                    </div>
                  );
                })}
              </div>}

              <form className="input-form" onSubmit={this.submitComment}>
                <div className="run-show-comment-form">
                  <label className="comment-label">Comment</label>
                  <input
                    type="text"
                    className="form-control"
                    name="content"
                    id="comment-box"
                    onChange={this.handleChange}
                    value={this.state.comment.content}
                  />
                  <button className="btn-info">POST</button>
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
