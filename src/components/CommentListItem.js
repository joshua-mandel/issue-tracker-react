import moment from 'moment';

function CommentListItem({ comment }) {

  return (
    <div className="mb-3">
      <div className="card h-100 bg-light">
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="card-title">
            <h6 className="card-title mb-1 fs-5">{comment.FullName}</h6>
          </div>
          <div className="card-text">
            <div className='fs-5'>{comment.commentText}</div>
          </div>
        </div>
        <div className="card-footer">
          <div>Created {moment(comment.submittedOn).fromNow()}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentListItem;
