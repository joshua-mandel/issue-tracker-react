import { useNavigate } from 'react-router-dom';

function BugListItem({bug}) {

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate(`/bug-editor/${bug.id}/${bug.title}/${bug.description}/${bug.bugClass}`);
  }

  return (
    <div className=' col-8 mb-3'>
    <div class="card bg-light">
    <div class="card-body">
      <h5 class="card-title">Id: {bug.id} | {bug.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Bug Class: {bug.bugClass}</h6>
      <p class="card-text">{bug.description}</p>
      <button onClick={handleClick} className="btn btn-secondary btn-md btn-block" type="button">Edit Bug</button>
    </div>
  </div>
  </div>
    )
}

export default BugListItem;