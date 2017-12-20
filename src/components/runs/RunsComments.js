import React from 'react';
import moment from 'moment';
import Auth from '../../lib/Auth';

function RunsComments({ run, comment, submitComment, handleChange, deleteComment }) {
  const currentUser = Auth.getPayload();
  const deleteButton = {
  };

  return (
    <div className="row">
      <h3>Comments</h3>
      { run.comments && <div>
        { run.comments.map(comment => {
          return(
            <div key={comment.id} className="run-show-comment-individual">
              <p>{comment.content}</p>
              <p>
                <strong>@{comment.createdBy.username} {moment(comment.createdAt).fromNow()}</strong>
                <button
                  className="btn-danger"
                  onClick={() => deleteComment(comment.id)}
                  disabled={currentUser.userId !== comment.createdBy.id}
                  style={deleteButton}
                >delete</button>
              </p>

            </div>
          );
        })}
      </div>}

      <form className="input-form" onSubmit={submitComment}>
        <div className="run-show-comment-form">
          <label className="comment-label">Comment</label>
          <input
            type="text"
            className="form-control"
            name="content"
            id="comment-box"
            onChange={handleChange}
            value={comment.content}
          />
          <button className="btn-info">POST</button>
        </div>
      </form>

    </div>
  );
}

export default RunsComments;
