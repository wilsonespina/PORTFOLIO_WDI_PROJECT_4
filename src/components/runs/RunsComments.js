import React from 'react';

// import BackButton from '../utility/BackButton';

function RunsComments({ run, comment, submitComment, handleChange, deleteComment }) {
  return (
    <div className="row">
      <h3>Comments</h3>
      { run.comments && <div>
        { run.comments.map(comment => {
          return(
            <div key={comment.id} className="run-show-comment-individual">
              <p>{comment.content}</p>
              <p><strong>@{comment.createdBy.username}</strong></p>
              <button className="btn-danger" onClick={() => deleteComment(comment.id)}>delete</button>
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
