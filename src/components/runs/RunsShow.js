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
        // find the deleted comment in prevState and splice it away
        const comments = this.state.run.comments.filter(comment => comment.id !== commentId);
        const run = Object.assign({}, this.state.run, { comments: comments });
        this.setState({ run: run });



        // this.setState({ runs: { comments: comments }});

        // this.setState(prevState => {
        //   const index = prevState.indexOf(comment);
        //
        //   console.log(index);
        // });



        // this.setState({ run: res.data });


      })
      .catch(err => this.setState({ errors: err.response.data.errors }));


      // .then(res => {
      //   const run = Object.assign({}, this.state.run, { comments: res.data.comments });
      //   this.setState({ run, comment: { content: '' } });
      // })


  }

  render() {
console.log(this.state.run);

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
