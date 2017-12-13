import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ReactStars from 'react-stars';
import moment from 'moment';

import RunsComments from './RunsComments';
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
    },
    userRating: 0,
    errors: null
  }

  componentWillMount() {
    this.getRun();
  }

  getRun = () => {
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

  handleRatingChange = (userRating) => {
    this.setState({ userRating }, () => {
      console.log('change', this.state);
    });
  }

  saveRating = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/runs/${this.props.match.params.id}/ratings`,  { value: this.state.userRating }, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        this.setState({ run: res.data });
      })
      .catch(err => this.setState({ errors: err.response.data.message }));
  }

  render() {

    const currentUser = Auth.getPayload();
    console.log(currentUser.userId);
    // console.log(this.state.run.user);

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
                <p>{moment(this.state.run.date).startOf('day').fromNow()}</p>
                <p>Average rating: {this.state.run.averageRating}</p>,
              </div>}
              {this.state.run.user && <button
                className="btn btn-danger"
                onClick={this.deleteRun}
                disabled={currentUser.userId !== this.state.run.user.id}
                // style={deleteButton}
              >DELETE RUN</button>}

              <h3>YOUR RATING:</h3>

              <form onSubmit= {this.saveRating} >
                <ReactStars
                  count={5}
                  size={50}
                  value={this.state.userRating}
                  onChange={this.handleRatingChange}
                  color2={'#E76200'} />
                {/* onSubmit= {() => this.saveRating(averageRating)} /> */}

                <button >Submit rating</button>
                {this.state.errors && <span>{this.state.errors}</span>}
              </form>


            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 run-show-comments-box">
              <RunsComments
                run={this.state.run}
                comment={this.state.comment}
                submitComment={this.submitComment}
                handleChange={this.handleChange}
                deleteComment={this.deleteComment}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default RunsShow;
