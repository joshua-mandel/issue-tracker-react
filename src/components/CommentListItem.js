import moment from 'moment';

function CommentListItem({ comment }) {

  return (
    <div className="mb-3">
      <div className="card h-100 bg-light">
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="card-title m-0">
            <h6 className='card-title fs-4'>{comment.commentText}</h6>
          </div>
        </div>
        <div className="card-footer">
          <div>Created {moment(comment.submittedOn).fromNow()} by {comment.FullName}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentListItem;
