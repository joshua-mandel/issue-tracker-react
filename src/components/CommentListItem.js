import moment from 'moment';

function CommentListItem({ comment }) {

  return (
    <div className="col-12 mb-2">
      <div className="card h-100 bg-light">
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="card-title">
            <h5 className="card-title mb-1">{comment.FullName}</h5>
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
