import { useParams } from 'react-router-dom';

function BugEditor() {

  const { id, title, description, bugClass } = useParams();


  return (
    <h1>{id}</h1>
  )
}

export default BugEditor;